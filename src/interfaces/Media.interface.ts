import { MediaType } from '../enums/MediaType';

export interface Media {
  id: number;
  album_id: number;
  external_id?: string;
  cloudId?: string;
  url: string;
  source_url: string;
  type: MediaType;
  display_order: number;
  primary?: boolean;
}
