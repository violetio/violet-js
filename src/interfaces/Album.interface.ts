import { AlbumType } from '../enums/AlbumType';
import { Media } from './Media.interface';

export interface Album {
  id: number;
  parent_id: number;
  type: AlbumType;
  name?: string;
  media: Media[];
  primaryMedia: Media;
}
