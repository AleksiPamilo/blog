import type { Schema, Attribute } from '@strapi/strapi';

export interface CodingTags extends Schema.Component {
  collectionName: 'components_coding_tags';
  info: {
    displayName: 'tags';
  };
  attributes: {};
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'coding.tags': CodingTags;
    }
  }
}
