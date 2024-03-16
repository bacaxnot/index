import { z } from "zod";

export const CLINameSchema = z.string().regex(/^[a-z][a-z0-9-]*$/);
export const CLIOptionKeySchema = z.string().regex(/^--[a-z][a-z0-9-]*$/);
export const MajorMinorPatchSchema = z.string().regex(/^\d+\.\d+\.\d+$/);
