import { isValidWorkspace } from '../utils/file-system/is-valid-workspace.util';

export class Guard {
  static notAngularWorkspace(): void {
    if (!isValidWorkspace()) {
      throw new Error('Not an Angular workspace');
    }
  }

  static notNullOrEmpty(
    value: unknown,
    message: string,
  ): asserts value is NonNullable<unknown> {
    if (!value) {
      throw new Error(message);
    }
  }
}
