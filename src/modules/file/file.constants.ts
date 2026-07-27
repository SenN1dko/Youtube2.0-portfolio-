export const ALLOWED_FOLDERS = ['videos', 'thumbnails', 'avatars'] as const
export type AllowedFolder = typeof ALLOWED_FOLDERS[number]

export const ALLOWED_FILE_EXTENSIONS = ['mp4', 'avi', 'mov', 'wmv', 'mkv', 'jpg', 'png', 'webp']
export const MAX_FILE_SIZE = 1024 * 1024 * 1024 // 1GB

// Enum для качеств плеера
export enum EnumVideoPlayerQuality {
  Q4K = '4K',
  Q2K = '2K',
  Q1080p = '1080p',
  Q720p = '720p',
  Q480p = '480p',
  Q360p = '360p',
}

// Лестница качеств под твою новую систему папок
export const QUALITY_LADDER = [
    { height: 2160, label: EnumVideoPlayerQuality.Q4K },   // '4K'
    { height: 1440, label: EnumVideoPlayerQuality.Q2K },   // '2K'
    { height: 1080, label: EnumVideoPlayerQuality.Q1080p }, // '1080p'
    { height: 720,  label: EnumVideoPlayerQuality.Q720p },  // '720p'
    { height: 480,  label: EnumVideoPlayerQuality.Q480p },  // '480p'
    { height: 360,  label: EnumVideoPlayerQuality.Q360p },  // '360p'
] as const

export function resolveMaxQuality(sourceHeight: number): EnumVideoPlayerQuality {
    const match = QUALITY_LADDER.find(q => sourceHeight >= q.height)
    return match?.label ?? QUALITY_LADDER[QUALITY_LADDER.length - 1].label
}