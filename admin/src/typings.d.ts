/* SystemJS module definition */
declare var module: NodeModule;
declare function eRequire(module: string): any;
interface NodeModule {
  id: string;
}
