import { ObjectLiteralExpression, Project } from 'ts-morph';
import { AngularJsonProjectInfo } from '../angularjson/get-angular-json-project-info';

export interface Renamer {
  rename: (
    project: Project,
    documentPath: string,
    metadata: ObjectLiteralExpression,
    angularJson: AngularJsonProjectInfo,
  ) => Promise<string>;
}
