import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "../../backend/index";
export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();
