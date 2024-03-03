import { isValidWorkspace } from '../utils/file-system/is-valid-workspace.util';

export class Guard {
  static notAngularWorkspace(action: (message: string) => unknown): void {
    if (!isValidWorkspace()) {
      action('Not an Angular workspace');
      throw new Error('Not an Angular workspace');
    }
  }

  static notNullOrEmpty(
    value: unknown,
    action: () => unknown,
  ): asserts value is NonNullable<unknown> {
    if (!value) {
      action();
      throw new Error();
    }
  }
}
