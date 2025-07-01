"use client";

import { useMutation } from "@apollo/client";
import { CREATE_PLAYER } from "@/graphql/client/mutations/playerMutations";

export const useCreatePlayer = () => {
  return useMutation(CREATE_PLAYER);
};
