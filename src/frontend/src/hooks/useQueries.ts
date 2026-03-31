import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useActor } from "./useActor";

export function useGetMaintenanceMode() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ["maintenanceMode"],
    queryFn: async () => {
      if (!actor) return false;
      return (actor as any).getMaintenanceMode();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 10000,
  });
}

export function useToggleMaintenanceMode() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not available");
      return (actor as any).toggleMaintenanceMode();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["maintenanceMode"] });
    },
  });
}

export function useLogVisit() {
  const { actor } = useActor();

  return useMutation({
    mutationFn: async () => {
      if (!actor) return;
      await (actor as any).logVisit();
    },
  });
}

export function useGetVisits() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint[]>({
    queryKey: ["visits"],
    queryFn: async () => {
      if (!actor) return [];
      return (actor as any).getVisits();
    },
    enabled: !!actor && !isFetching,
  });
}
