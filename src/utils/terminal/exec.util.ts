import { PromiseWithChild, exec } from 'child_process';
import { promisify } from 'util';

export function execAsync(
  command: string,
  cwd: string,
): PromiseWithChild<{ stdout: string; stderr: string }> {
  return promisify(exec)(command, { cwd });
}
