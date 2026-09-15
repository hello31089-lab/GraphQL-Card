import { Kind, type GraphQLResolveInfo, type SelectionSetNode } from "graphql";
import type { Prisma } from "@prisma/client";

type Select = Record<string, true | { select: Select }>;

type FieldDefinition = {
  relation?: FieldMap;
};

type FieldMap = Record<string, FieldDefinition>;

const skillFields: FieldMap = {
  id: {},
  name: {},
};

const experienceFields: FieldMap = {
  id: {},
  company: {},
  position: {},
  startDate: {},
  endDate: {},
  achievements: {},
};

const projectFields: FieldMap = {
  id: {},
  name: {},
  url: {},
};

const profileFields: FieldMap = {
  id: {},
  name: {},
  description: {},
  githubUrl: {},
  linkedinUrl: {},
  otherUrl: {},
  skills: { relation: skillFields },
  experiences: { relation: experienceFields },
  projects: { relation: projectFields },
};

function mergeSelect(target: Select, source: Select): Select {
  for (const [field, value] of Object.entries(source)) {
    const current = target[field];

    if (
      current &&
      current !== true &&
      value !== true
    ) {
      target[field] = { select: mergeSelect(current.select, value.select) };
    } else {
      target[field] = value;
    }
  }

  return target;
}

function selectionSetToSelect(
  selectionSet: SelectionSetNode,
  fields: FieldMap,
  info: GraphQLResolveInfo,
): Select {
  const select: Select = {};

  for (const selection of selectionSet.selections) {
    if (selection.kind === Kind.FIELD) {
      const fieldName = selection.name.value;
      const field = fields[fieldName];

      if (!field) {
        continue;
      }

      if (field.relation && selection.selectionSet) {
        select[fieldName] = {
          select: selectionSetToSelect(selection.selectionSet, field.relation, info),
        };
      } else {
        select[fieldName] = true;
      }

      continue;
    }

    if (selection.kind === Kind.INLINE_FRAGMENT) {
      mergeSelect(select, selectionSetToSelect(selection.selectionSet, fields, info));
      continue;
    }

    if (selection.kind === Kind.FRAGMENT_SPREAD) {
      const fragment = info.fragments[selection.name.value];

      if (fragment) {
        mergeSelect(select, selectionSetToSelect(fragment.selectionSet, fields, info));
      }
    }
  }

  return select;
}

export function profileSelectFromInfo(info: GraphQLResolveInfo): Prisma.ProfileSelect {
  const select: Select = {};

  for (const fieldNode of info.fieldNodes) {
    if (fieldNode.selectionSet) {
      mergeSelect(select, selectionSetToSelect(fieldNode.selectionSet, profileFields, info));
    }
  }

  return select as Prisma.ProfileSelect;
}
