import type { IChannel } from "./channel.types";
import type { IFullUser } from "./user.type";

export interface ISettings extends Pick<IFullUser, 'email' | 'username'> {
    channel:Pick<IChannel , 'avatar' | 'banner' | 'slug' | 'description'>
}