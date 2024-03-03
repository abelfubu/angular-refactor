import { StylesToggler } from './styles.toggler';

export const stylesToFileToggler = (exec: RegExpExecArray): StylesToggler => ({
  toggle: (document) => {
    console.log(exec);
  },
});
