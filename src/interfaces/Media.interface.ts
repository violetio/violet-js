import { MediaType } from '../enums/MediaType';

export interface Media {
  id: number;
  albumId: number;
  externalId?: string;
  cloudId?: string;
  url: string;
  sourceUrl: string;
  type: MediaType;
  displayOrder: number;
  primary?: boolean;
}
