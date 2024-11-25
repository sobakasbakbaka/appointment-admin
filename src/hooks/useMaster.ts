import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMaster,
  createSchedule,
  deleteMaster,
  deleteSchedule,
  fetchMasterById,
  fetchMasters,
} from "../api/master/masterApi.ts";

export const useMaster = (id?: number) => {
  const queryClient = useQueryClient();

  const {
    data: masters,
    error: mastersError,
    isLoading: mastersIsLoading,
  } = useQuery({
    queryKey: ["masters"],
    queryFn: fetchMasters,
  });

  const {
    data: master,
    error: masterError,
    isLoading: masterIsLoading,
  } = useQuery({
    queryKey: ["master", id],
    queryFn: ({ queryKey }) => {
      const [, masterId] = queryKey as [string, number];
      return fetchMasterById(masterId);
    },
    enabled: !!id,
  });

  const create = useMutation({
    mutationFn: createMaster,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["masters"] });
    },
  });

  const removeMaster = useMutation({
    mutationFn: deleteMaster,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["masters", "master"] });
    },
  });

  const createMasterSchedule = useMutation({
    mutationFn: createSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["masters", "master"] });
    },
  });

  const removeMasterSchedule = useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["masters", "master"] });
    },
  });

  return {
    masters,
    mastersError,
    mastersIsLoading,
    master,
    masterError,
    masterIsLoading,
    createMaster: create,
    removeMaster,
    createMasterSchedule,
    removeMasterSchedule,
  };
};
