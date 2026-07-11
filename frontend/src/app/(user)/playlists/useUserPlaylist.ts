import { playlistService } from "@/services/Playlist.services"
import { useQuery } from "@tanstack/react-query"

export function useUserPlaylist() {
  	const { data, isLoading, refetch } = useQuery({
		queryKey: ['playlists'],
		queryFn: () => playlistService.getUserPlaylists()
	})

  return {
    data,isLoading,refetch
  }
}