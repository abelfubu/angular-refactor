export const enum Command {
  GenerateComponent = 'angular-refactorizer.generateComponent',
  GenerateService = 'angular-refactorizer.generateService',
  GeneratePipe = 'angular-refactorizer.generatePipe',
  GenerateDirective = 'angular-refactorizer.generateDirective',
  GenerateInterceptor = 'angular-refactorizer.generateInterceptor',
  GenerateGuard = 'angular-refactorizer.generateGuard',
  GenerateModule = 'angular-refactorizer.generateModule',
  GenerateInterface = 'angular-refactorizer.generateInterface',
  GenerateEnum = 'angular-refactorizer.generateEnum',
  GenerateResolver = 'angular-refactorizer.generateResolver',
  GenerateLibrary = 'angular-refactorizer.generateLibrary',
  GenerateConfig = 'angular-refactorizer.generateConfig',
  GenerateEnvironments = 'angular-refactorizer.generateEnvironments',
  ToggleInlineTemplate = 'angular-refactorizer.toggleInlineTemplate',
  ToggleInlineStyles = 'angular-refactorizer.toggleInlineStyles',
  RenameComponent = 'angular-refactorizer.renameComponent',
  RenameDirective = 'angular-refactorizer.renameDirective',
  RenamePipe = 'angular-refactorizer.renamePipe',
  Test = 'angular-refactorizer.test',
}
