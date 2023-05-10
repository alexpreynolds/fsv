import * as Constants from "./Constants.js";

export const isValidChromosome = (assembly, chromosomeName) => {
  // console.log(`isValidChromosome | ${assembly} | ${chromosomeName}`);
  const chromosomeBounds = Constants.assemblyBounds[assembly];
  if (!chromosomeBounds) {
    // console.log("isValidChromosome: bad or unknown assembly");
    return false; // bad or unknown assembly
  }
  const chromosomeNames = Object.keys(chromosomeBounds).map((n) => n.toLowerCase());
  if (!chromosomeNames) {
    // console.log("isValidChromosome: no chromosomes");
    return false; // no chromosomes? that would be weird
  }
  const chromosomeNamesContainsNameOfInterest = (chromosomeNames.indexOf(chromosomeName.toLowerCase()) > -1);
  return chromosomeNamesContainsNameOfInterest;
}

export const getRangeFromString = (str, applyPadding, applyApplicationBinShift, assembly) => {
  // console.log(`Helpers.getRangeFromString ${str} ${applyPadding} ${applyApplicationBinShift} ${assembly}`);
  if (!applyApplicationBinShift) applyApplicationBinShift = false;
  /*
    Test if the new location passes as a chrN:X-Y pattern, 
    where "chrN" is an allowed chromosome name, and X and Y 
    are integers, and X < Y. 
    
    We allow chromosome positions X and Y to contain commas, 
    to allow cut-and-paste from the UCSC genome browser.
  */
  let matches = str.replace(/,/g, '').split(/[:-\s]+/g).filter( i => i );
  let chrom = "";
  let start = -1;
  let stop = -1;
  // console.log("matches", matches);
  if (matches.length === 3) {
    chrom = matches[0];
    if (!isValidChromosome(assembly, chrom)) {
      return null;
    }
    chrom = getTrueChromosomeName(assembly, chrom);
    start = parseInt(matches[1].replace(',',''));
    stop = parseInt(matches[2].replace(',',''));
    if (applyPadding) {
      start -= parseInt(Constants.appDefaultHgViewRegionUpstreamPadding);
      stop += parseInt(Constants.appDefaultHgViewRegionDownstreamPadding);
    }
  }
  else if (matches.length === 2) {
    chrom = matches[0];
    if (!isValidChromosome(assembly, chrom)) {
      return null;
    }
    chrom = getTrueChromosomeName(assembly, chrom);
    let midpoint = parseInt(matches[1].replace(',',''));
    start = midpoint - parseInt(Constants.appDefaultHgViewRegionUpstreamPadding);
    stop = midpoint + parseInt(Constants.appDefaultHgViewRegionDownstreamPadding);
  }
  else if (matches.length === 1) {
    chrom = matches[0];
    if (!isValidChromosome(assembly, chrom)) {
      return null;
    }
    chrom = getTrueChromosomeName(assembly, chrom);
    if (Constants.assemblyChromosomes[assembly].includes(chrom)) {
      start = 1
      stop = Constants.assemblyBounds[assembly][chrom]['ub'] - 1;
    }
  }
  else {
    return null;
  }
  //console.log("chrom, start, stop", chrom, start, stop);
  //let padding = (applyPadding) ? parseInt(Constants.defaultHgViewGenePaddingFraction * (stop - start)) : 0;
  //let assembly = this.state.hgViewParams.genome;
  //let chrLimit = parseInt(Constants.assemblyBounds[assembly][chrom].ub) - 10;
  //
  // Constants.applicationBinShift applies a single-bin correction to the padding 
  // applied to the specified range (exemplar, etc.). It is not perfect but helps 
  // when applying a vertical line on selected exemplars.
  //
  //start = ((start - padding + (applyApplicationBinShift ? Constants.applicationBinShift : 0)) > 0) ? (start - padding + (applyApplicationBinShift ? Constants.applicationBinShift : 0)) : 0;
  //stop = ((stop + padding + (applyApplicationBinShift ? Constants.applicationBinShift : 0)) < chrLimit) ? (stop + padding + (applyApplicationBinShift ? Constants.applicationBinShift : 0)) : stop;
  if (start < 0) {
    start = 0;
  }
  if (stop >= Constants.assemblyBounds[assembly][chrom]['ub']) {
    stop = Constants.assemblyBounds[assembly][chrom]['ub'];
  }
  const range = [chrom, start, stop];
  // console.log("range", range);
  return range;
}

export const getTrueChromosomeName = (assembly, chromosomeName) => {
  let chromosomeBounds = Constants.assemblyBounds[assembly];
  if (!chromosomeBounds) {
    // console.log("fixChromosomeName: bad or unknown assembly");
    return null; // bad or unknown assembly
  }
  const chromosomeNamesOriginal = Object.keys(chromosomeBounds);
  const chromosomeNamesLC = chromosomeNamesOriginal.map((n) => n.toLowerCase());
  if (!chromosomeNamesOriginal) {
    // console.log("fixChromosomeName: no chromosomes");
    return null; // no chromosomes? that would be weird
  }
  let indexOfChromosomeNameOfInterest = chromosomeNamesLC.indexOf(chromosomeName.toLowerCase());
  // console.log(`chromosomeNamesLC.indexOf(chromosomeName.toLowerCase()) ${chromosomeNamesLC.indexOf(chromosomeName.toLowerCase())}`);
  return chromosomeNamesOriginal[indexOfChromosomeNameOfInterest];
}