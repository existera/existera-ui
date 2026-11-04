# Third-Party Notices

Existera UI includes and depends on third-party open-source software.

Third-party software remains subject to its respective license terms and copyright notices.

Key dependencies include:

- React — MIT License
- Framer Motion — MIT License
- clsx — MIT License
- React DOM — MIT License
- esbuild — MIT License
- PDF.js (`pdfjs-dist`) — Apache License 2.0
- React Syntax Highlighter — MIT License
- Lucide React — ISC License, with MIT notices for icons derived from Feather
- tailwind-merge — MIT License

PDF.js includes third-party fonts and WebAssembly decoders with their own
license and copyright notices. The package includes the original notices in
`dist/pdfjs-licenses/`, including PDF.js's `LICENSE`, `standard_fonts-LICENSE_*`,
and `wasm-LICENSE_*`. These files are copied from `pdfjs-dist` during the build.

Full original license and attribution files for direct dependencies, React peers,
and packages bundled into the distribution are included in `dist/third-party-licenses/`.
The Lucide React license is copied in full, including its Feather copyright and
MIT permission notice. `dist/third-party-licenses/index.json` records the installed
package versions and included files. These notices are regenerated on every build;
the build fails if a required package has no license file.

Direct dependencies are listed in `package.json`; bundled package licenses are
indexed in `dist/third-party-licenses/index.json`. Each dependency retains its
original license; Existera UI's MIT license applies to Existera UI's own code.

Copyright and license rights for third-party software remain with their respective authors and contributors.
