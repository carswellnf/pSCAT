# pSCAT

## About pSCAT 
pSCAT (phage Start Codon Analysis Tool) is a tool designed to identify and quantify conserved starts in a ‘phamily.’ A phamily, pham for short, is a group of related bacteriophage genes. Since phams are a collection of different, but related, genes, there are several different start codons among the genes. pSCAT groups genes in a pham that share the same available start codons and the same actual predicted start into numbered tracks. Each track is placed in a plot so the conservation of starts, and actual starts can be observed across the entire pham. pSCAT also quantifies the amount a specific start codon is repeated and determines the length of genes with the same predicted actual start. 

 

pSCAT replaces an old SEAPHAGES tool called Starterator. While similar, pSCAT offers multiple advantages of Starterator. This includes having an easy to interpret and cleaner interface. The biggest advantage pSCAT has over the old tool is a high degree of interaction. Starterator outputs are sent via PDF files and only contain one graphical representation that is often separated by page breaks with no way of interaction. pSCAT track outputs are on webpage that allows to change pham selections easily, order tracks, highlight wanted tracks, and build separate graphical representations. 

 

pSCAT was designed by James Madison University students Nathan Carswell, Isaac Stuart, and Drew Tobin. 


This is an [Observable Framework](https://observablehq.com/framework) project. To start the local preview server, run:

```
npm run dev
```

Then visit <http://localhost:3000> to preview your project.

## Command reference

| Command              | Description                                           |
| -----------------    | ------------------------------------------------------|
| `npm install`        | Install or reinstall dependencies                     |
| `npm run dev`        | Start local preview server                            |
| `npm run build`      | Build your static site, generating `./dist`           |
| `npm run deploy`     | Deploy your project to Observable                     |
| `npm run clean`      | Clear the local data loader cache                     |
| `npm run observable` | Run commands like `observable help`                   |
