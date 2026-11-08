import type { MDXComponents } from 'mdx/types';
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="mt-8 mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-12 mb-4 text-3xl font-semibold tracking-tight first:mt-0">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 mb-4 text-2xl font-semibold tracking-tight">{children}</h3>,
    p: ({ children }) => <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">{children}</p>,
    ul: ({ children }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2 text-muted-foreground">{children}</ul>,
    ol: ({ children }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2 text-muted-foreground">{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    blockquote: ({ children }) => <blockquote className="mt-6 border-l-2 border-primary pl-6 italic text-muted-foreground">{children}</blockquote>,
    pre: ({ children }) => <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4 px-4 font-mono text-sm leading-relaxed">{children}</pre>,
    code: ({ children }) => <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">{children}</code>,
    a: ({ href, children }) => <a href={href} className="font-medium text-cyan-400 underline underline-offset-4 hover:text-cyan-300">{children}</a>,
    ...components,
  };
}
