# Modules vs. inner classes

Should use one class `window` and have everything in it (including classes and namespaces), so that:

- Feature testing works e.g. `!!window.Set`
