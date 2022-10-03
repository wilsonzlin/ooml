export type TemplateBinding = {
  boundProps: string[];
  compute: Function;
};

export type TemplateAttr = {
  name: string;
  binding: TemplateBinding;
};

export type TemplateElement = {
  name: string;
  attrs: TemplateAttr[];
  children: (string | TemplateBinding | TemplateElement)[];
};
