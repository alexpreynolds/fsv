export const annotationScheme = "https";
export const annotationHost = "annotations.altius.org";
export const annotationPort = "8443"; // SSL over 8443

export const mapIndexDHSScheme = "https";
export const mapIndexDHSHost = "meuleman-map-index-dhs.altius.org";
export const mapIndexDHSPort = "443";
export const mapIndexDHSSetName = "Index_DHS";

export const appModes = {
  "test" : "HiGlass test",
  "cd3pos" : "CD3+",
  "hudep" : "HUDEP",
  // "hudepTest" : "HUDEP (control test)",
};

export const appModeLabels = {
  "test" : "test",
  "cd3pos" : "cd3pos",
  "hudep" : "hudep",
  // "hudepTest" : "hudepTest",
};

export const appDefaultAssembly = "hg38";
export const appDefaultMode = "hudep";
export const appMinimumTileWidth = 15000;
export const appDefaultTileWidth = 30000;
export const appDefaultHgViewEditable = false;
export const appDefaultHgViewTranscriptsDirectional = true;
export const appDefaultHgViewIndexDHSPadding = 250;
export const appDefaultHgViewRegionUpstreamPadding = 5000;
export const appDefaultHgViewRegionDownstreamPadding = 5000;
export const appDefaultAutocompleteInputPlaceholder = "Specify an interval or gene";
export const appDefaultHgViewGenePaddingFraction = 0.2;
export const appHeaderHeight = 30;
export const appChromosomeTrackHeight = 30;
export const appSequenceTrackHeight = 14;
export const appSequenceTrackColormap = [
  "#007FFF", // color of A
  "#e8e500", // color of T
  "#008000", // color of G
  "#FF0038", // color of C
  "#800080", // color of N
  "#DCDCDC", // color of everything else
];
export const appCoverageTrackHeight = 20;
export const appGeneAnnotationTrackHeight = 100;
export const appGapTrackHeight = 2;
export const appDefaultFiberSeqReadHexColor = "#663399cc";
export const appDefaultFiberSeqReadControlHexColor = "#336699cc";
export const appDefaultFiberSeqReadTreatmentHexColor = "#009966cc";
export const appDefaultFiberSeqReadFoldChangeHexColor = "#996633cc";
export const appDefaultFiberSeqReadFoldChangeHexColormap = ["#fde725ff", "#5ec962ff", "#21918cff", "#3b528bff", "#440154ff"];
export const appDefaultFiberSeqReadCpGHexColor = "#ff0000cc";
export const appDefaultProbabilitySliderRange = [100*120/255, 100*255/255];
export const appDefaultProbabilityRange = [100*240/255, 100*255/255];
export const appDefaultProbabilityThresholdRange = [240, 255];
export const appDefaultHgViewM6AEventViewable = true;
export const appDefaultM6AEventCategories = [
  {"unmodifiedBase": "A", "code": "a", "strand": "+"},
  {"unmodifiedBase": "T", "code": "a", "strand": "-"},
];
export const appDefaultM6AEventCategoryAbbreviations = [
  'm6A+', 
  'm6A-'
];
export const appDefaultM6AEventColors = [
  appDefaultFiberSeqReadHexColor, 
  appDefaultFiberSeqReadHexColor,
];
export const appDefaultM6AControlEventColors = [
  appDefaultFiberSeqReadControlHexColor, 
  appDefaultFiberSeqReadControlHexColor,
];
export const appDefaultM6ATreatmentEventColors = [
  appDefaultFiberSeqReadTreatmentHexColor, 
  appDefaultFiberSeqReadTreatmentHexColor,
];
export const appDefaultHgView5mCEventViewable = true;
export const appDefault5mCEventCategories = [
  {"unmodifiedBase": "C", "code": "m", "strand": "+"},
];
export const appDefault5mCEventCategoryAbbreviations = [
  '5mC+'
];
export const appDefault5mCEventColors = [
  appDefaultFiberSeqReadCpGHexColor,
];

export const assemblyChromosomes = {
  'hg19':[
    'chr1', 'chr2', 'chr3', 'chr4', 'chr5', 'chr6', 'chr7', 'chr8', 'chr9', 'chr10', 'chr11', 'chr12', 'chr13', 'chr14', 'chr15', 'chr16', 'chr17', 'chr18', 'chr19', 'chr20', 'chr21', 'chr22', 'chrX', 'chrY'
  ],
  'hg38':[
    'chr1', 'chr2', 'chr3', 'chr4', 'chr5', 'chr6', 'chr7', 'chr8', 'chr9', 'chr10', 'chr11', 'chr12', 'chr13', 'chr14', 'chr15', 'chr16', 'chr17', 'chr18', 'chr19', 'chr20', 'chr21', 'chr22', 'chrX', 'chrY'
  ],
  'mm10':[
    'chr1', 'chr2', 'chr3', 'chr4', 'chr5', 'chr6', 'chr7', 'chr8', 'chr9', 'chr10', 'chr11', 'chr12', 'chr13', 'chr14', 'chr15', 'chr16', 'chr17', 'chr18', 'chr19', 'chrX', 'chrY'
  ]
};

export const assemblyBounds = {
  'hg19':{
    'chr1':{'ub':249250621},
    'chr2':{'ub':243199373},
    'chr3':{'ub':198022430},
    'chr4':{'ub':191154276},
    'chr5':{'ub':180915260},
    'chr6':{'ub':171115067},
    'chr7':{'ub':159138663},
    'chr8':{'ub':146364022},
    'chr9':{'ub':141213431},
    'chr10':{'ub':135534747},
    'chr11':{'ub':135006516},
    'chr12':{'ub':133851895},
    'chr13':{'ub':115169878},
    'chr14':{'ub':107349540},
    'chr15':{'ub':102531392},
    'chr16':{'ub':90354753},
    'chr17':{'ub':81195210},
    'chr18':{'ub':78077248},
    'chr19':{'ub':59128983},
    'chr20':{'ub':63025520},
    'chr22':{'ub':51304566},
    'chr21':{'ub':48129895},
    'chrX':{'ub':155270560},
    'chrY':{'ub':59373566},
  },
  'hg38':{
    'chr1':{'ub':248956422, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr1.chrom.sizes', 'tilesetUid': 'J2X-Qbj3THWP1TPMl0rpng'},
    'chr10':{'ub':133797422, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr10.chrom.sizes', 'tilesetUid': 'SHrBc-dlS3afbs255SU0Sg'},
    'chr11':{'ub':135086622, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr11.chrom.sizes', 'tilesetUid': 'DVLBa8RgSTOmPH-klHoNzg'},
    'chr12':{'ub':133275309, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr12.chrom.sizes', 'tilesetUid': 'Sye2yCpATgCR4W8c7eyOPA'},
    'chr13':{'ub':114364328, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr13.chrom.sizes', 'tilesetUid': 'adkI32ooSG-HnV-6MefUDw'},
    'chr14':{'ub':107043718, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr14.chrom.sizes', 'tilesetUid': 'NZ9C-xdPSPW3JKsFNthW6g'},
    'chr15':{'ub':101991189, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr15.chrom.sizes', 'tilesetUid': 'JwP5ITWfQTa32ph8IB_91w'}, 
    'chr16':{'ub':90338345, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr16.chrom.sizes', 'tilesetUid': 'IWINamBqSjiH8owdpUix4g'},
    'chr17':{'ub':83257441, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr17.chrom.sizes', 'tilesetUid': 'BAqTeC2FSP-4rn8h1XfbMQ'},
    'chr18':{'ub':80373285, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr18.chrom.sizes', 'tilesetUid': 'WqGVojVBQ52n9vX3z7nzcg'},
    'chr19':{'ub':58617616, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr19.chrom.sizes', 'tilesetUid': 'AecNBiMORi26S_-QRtz56A'},
    'chr2':{'ub':242193529, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr2.chrom.sizes', 'tilesetUid': 'dWtnJt3zQeWGM6eMMKrn_Q'},
    'chr20':{'ub':64444167, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr20.chrom.sizes', 'tilesetUid': 'eeVtkkyLToeTsJ6nQPOF-w'},
    'chr21':{'ub':46709983, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr21.chrom.sizes', 'tilesetUid': 'XsAYCJ-TTAaRW2b8-COegQ'},
    'chr22':{'ub':50818468, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr22.chrom.sizes', 'tilesetUid': 'D4cxpg8kQYKKhn9V3qdbJQ'},
    'chr3':{'ub':198295559, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr3.chrom.sizes', 'tilesetUid': 'T_EEPlNHTL6EoIu10GIoAA'},
    'chr4':{'ub':190214555, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr4.chrom.sizes', 'tilesetUid': 'T1godJb4QXG73I6g7V7HvA'},
    'chr5':{'ub':181538259, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr5.chrom.sizes', 'tilesetUid': 'dNhkocSuTwCvhE38uwH15g'},
    'chr6':{'ub':170805979, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr6.chrom.sizes', 'tilesetUid': 'SdI_gQ3mQOSmZvVtN3oCVg'},
    'chr7':{'ub':159345973, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr7.chrom.sizes', 'tilesetUid': 'YDjgrb5KRsChS7h44zTu5w'},
    'chr8':{'ub':145138636, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr8.chrom.sizes', 'tilesetUid': 'UUzZ02z_SwesNJqmpdrUVA'},
    'chr9':{'ub':138394717, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chr9.chrom.sizes', 'tilesetUid': 'MNigvVunSAunbLZjRuyAXQ'},
    'chrX':{'ub':156040895, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chrX.chrom.sizes', 'tilesetUid': 'CITx8X4FSrWLDFuom2msPQ'},
    'chrY':{'ub':57227415, 'url': 'https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chrY.chrom.sizes', 'tilesetUid': 'Cyyrx235TbOuAQK6IaiUgQ'},
  },
  'mm10':{
    'chr1':{'ub':195471971},
    'chr10':{'ub':130694993},
    'chr11':{'ub':122082543},
    'chr12':{'ub':120129022},
    'chr13':{'ub':120421639},
    'chr14':{'ub':124902244},
    'chr15':{'ub':104043685},
    'chr16':{'ub':98207768},
    'chr17':{'ub':94987271},
    'chr18':{'ub':90702639},
    'chr19':{'ub':61431566},
    'chr2':{'ub':182113224},
    'chr3':{'ub':160039680},
    'chr4':{'ub':156508116},
    'chr5':{'ub':151834684},
    'chr6':{'ub':149736546},
    'chr7':{'ub':145441459},
    'chr8':{'ub':129401213},
    'chr9':{'ub':124595110},
    'chrX':{'ub':171031299},
    'chrY':{'ub':91744698},
  },
};

export const hg38FastaURL = "https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/hg38.meuleman.fixedBin.chrom.sizes.60.fa";
export const hg38FastaIndexURL = "https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/hg38.meuleman.fixedBin.chrom.sizes.60.fa.fai";
export const hg38ChromsizesURL = "https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chrom.sizes";

export const testHiglassChromsizesURL = "https://pkerp.s3.amazonaws.com/public/bamfile_test/GCF_000005845.2_ASM584v2_genomic.chrom.sizes";

export const testHiglassPileupViewconf = {
  "editable": true,
  "trackSourceServers": [
    "/api/v1",
    "http://higlass.io/api/v1"
  ],
  "exportViewUrl": "/api/v1/viewconfs",
  "views": [
    {
      "uid" : "abcd-test",
      "initialXDomain": [
        40000,
        60000
      ],
      "tracks": {
        "top": [
          {
            "type": "pileup",
            "height": 320,
            "options": {
              "axisPositionHorizontal": "right",
              "axisLabelFormatting": "normal",
              "showCoverage": false,
              "showMousePosition" : true,
              "colorScale": [
                // A T G C N Other
                "#2c7bb6",
                "#92c5de",
                "#ffffbf",
                "#fdae61",
                "#808080",
                "#DCDCDC"
              ]
            },
            "uid": "FylkvVBTSumoJ959HT4-5A",
            "data": {
              "type": "bam",
              "url": "https://pkerp.s3.amazonaws.com/public/bamfile_test/SRR1770413.sorted.bam",
              "chromSizesUrl": testHiglassChromsizesURL,
              "options": {
                  "maxTileWidth": appDefaultTileWidth
              }
            },
            "width": 470
          }
        ]
      },
      "layout": {
        "w": 12,
        "h": 12,
        "x": 0,
        "y": 0,
      }
    }
  ]
}

export const cd3posTestBAMURL = "https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/fsv.d2.stim.chr11.bam";
export const cd3posTestBAIURL = "https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/fsv.d2.stim.chr11.bam.bai";

export const cd3posHiglassPileupViewconf = {
  "editable": true,
  "zoomFixed" : false,
  "trackSourceServers": [
    "/api/v1",
    "http://higlass.io/api/v1"
  ],
  "exportViewUrl": "/api/v1/viewconfs",
  "views": [
    {
      "uid" : "abcd0001",
      "initialXDomain": [
        1813933893,
        1813936188
      ],
      "genomePositionSearchBoxVisible" : true,
      "genomePositionSearchBox" : {
        "autocompleteServer" : "http://higlass.io/api/v1",
        "chromInfoServer" : "http://higlass.io/api/v1",
        "visible" : true,
        "chromInfoId" : "hg38"
      },
      "tracks": {
        "top": [
          {
            "name" : "chromosomes_hg38",
            "created" : "2019-04-11T15:11:47.798450Z",
            "project" : "bLwQYp24jRG2YyAxGaGGwMg",
            "project_name" : "",
            "description" : "",
            "server" : "https://meuleman-higlass-us-west-2.altius.org/api/v1",
            "tilesetUid" : "e7yehSFuSvWu0_9uEK1Apw",
            "uid" : "4fd8b376-f112-4839-a5e1-cb8b4d49070f",
            "type" : "horizontal-chromosome-labels",
            "options" : {
              "color" : "#777777",
              "stroke" : "#FFFFFF",
              "fontSize" : 12,
              "fontIsAligned" : false,
              "showMousePosition" : true,
              "mousePositionColor" : "#999999",
              "name" : "chromosomes_hg38",
              "backgroundColor" : "white"
            },
            "height" : appChromosomeTrackHeight,
            "position" : "top"
          },
          {
            "uid": "seq_fasta_example",
            "type": "horizontal-sequence",
            "data": {
              "type": "fasta",
              "fastaUrl": hg38FastaURL,
              "faiUrl": hg38FastaIndexURL,
              "chromSizesUrl": hg38ChromsizesURL
            },
            "options": {
              "labelPosition": "hidden",
              "fontSize": 10,
              "fontFamily": "Helvetica",
              "fontColor": "white",
              "colorScale": appSequenceTrackColormap,
            },
            "height": appSequenceTrackHeight,
            "position": "top",
          },
          {
            "name": "spacer",
            "type": "empty",
            "height": appGapTrackHeight,
            "uid": "abcd",
          },
          {
            "name": "gencode.v38.annotation.gtf.higlass-transcripts.hgnc.090721.forceHGNC.coloredByVocabulary.beddb",
            "server" : "https://meuleman-higlass-us-west-2.altius.org/api/v1",
            "tilesetUid": "cv0JX4TlTIi-D1aEpV-C0A",
            "type": "horizontal-transcripts",
            "uid": "cv0JX4TlTIi-D1aEpV-C0A",
            "options": {
              "blockStyle": "directional", // "UCSC-like",
              "maxRows": 6,
              "maxTexts": 50,
              "labelFontSize": 10,
              "labelFontWeight": 500,
              "transcriptHeight": 14,
              "transcriptSpacing": 4,
              "showMousePosition": true,
              "startCollapsed": false,
              "showToggleTranscriptsButton": false,
              "utrColor": "grey",
              "plusStrandColor": "#111111",
              "minusStrandColor": "#111111",
              "trackMargin": {top:10, bottom:10, left:0, right:0},
              "blockCalculateTranscriptCounts": true,
              "highlightTranscriptType": "longestIsoform",
              "highlightTranscriptTrackBackgroundColor": "#fdcfcf",
            },
            "height" : appGeneAnnotationTrackHeight,
          },
          {
            "name": "fsv.d2.stim.chr11.m6aEventsPerBaseMeanWithClipped.filtered.versionSort.bedgraph.bw",
            "type": "bar",
            "height": appCoverageTrackHeight,
            "server" : "https://meuleman-higlass-us-west-2.altius.org/api/v1",
            "tilesetUid" : "WS0YhpG8S4CXn62fhLXwXg",
            "uid" : "bwtest-001",
            "options" : {
              "labelPosition": "hidden",
              "name": "fsv.d2.stim.chr11.m6aEventsPerBaseMeanWithClipped.filtered.versionSort.bedgraph.bw",
              "valueScaling": "linear",
              "valueScaleMin": 0,
              "colorRange": ['#FFFFFF', appDefaultFiberSeqReadHexColor],
              "showMousePosition" : true,
              "showTooltip": true,
              "minHeight": appCoverageTrackHeight,
            },
          },
          {
            "name": "spacer",
            "type": "empty",
            "height": appGapTrackHeight,
            "uid": "abcd",
          },
          {
            "type": "pileup",
            "height": 640,
            "options": {
              "axisPositionHorizontal": "right",
              "axisLabelFormatting": "normal",
              "outlineReadOnHover": "yes",
              // "groupBy": "strand",
              // "minusStrandColor": "#ebebeb",
              // "plusStrandColor": "#ebebeb",
              "showCoverage": false,
              "colorScale": [
                // A T G C N Other
                "#2c7bb6",
                "#92c5de",
                "#ffffbf",
                "#fdae61",
                "#808080",
                "#DCDCDC"
              ],
              "showLoadingText": false,
              "showMousePosition" : true,
              "methylation": {
                "set": "",
                "hideSubstitutions": true,
                "categories": [
                  {"unmodifiedBase": "A", "code": "a", "strand": "+"},
                  {"unmodifiedBase": "T", "code": "a", "strand": "-"},
                  {"unmodifiedBase": "C", "code": "m", "strand": "+"},
                ],
                "colors": [
                  appDefaultFiberSeqReadHexColor, 
                  appDefaultFiberSeqReadHexColor,
                  appDefaultFiberSeqReadCpGHexColor,
                ],
                "categoryAbbreviations": ['m6A+', 'm6A-', '5mC+'],
                "probabilityThresholdRange": appDefaultProbabilityThresholdRange,
              },
            },
            "uid": "FylkvVBTSumoJ959HT4-5A",
            "data": {
              "type": "bam",
              "bamUrl": cd3posTestBAMURL,
              "baiUrl": cd3posTestBAIURL,
              "chromSizesUrl": hg38ChromsizesURL,
              "options": {
                  "maxTileWidth": appDefaultTileWidth,
              },
            },
          },
        ]
      },
      "layout": {
        "w": 12,
        "h": 12,
        "x": 0,
        "y": 0,
      }
    }
  ]
}

export const hudepTestControlTestBAMURL = "https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/HUDEP.treatment.DS182417.chr11.test_v9.bam";
export const hudepTestControlTestBAIURL = "https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/HUDEP.treatment.DS182417.chr11.test_v9.bam.bai";

export const hudepTestHiglassPileupViewconf = {
  "editable": true,
  "zoomFixed" : false,
  "trackSourceServers": [
    "/api/v1",
    "http://higlass.io/api/v1"
  ],
  "exportViewUrl": "/api/v1/viewconfs",
  "views": [
    {
      "uid" : "abcd0002",
      "initialXDomain": [
        1813933893,
        1813936188
      ],
      "genomePositionSearchBoxVisible" : true,
      "genomePositionSearchBox" : {
        "autocompleteServer" : "http://higlass.io/api/v1",
        "chromInfoServer" : "http://higlass.io/api/v1",
        "visible" : true,
        "chromInfoId" : "hg38"
      },
      "tracks": {
        "top": [
          {
            "name" : "chromosomes_hg38",
            "created" : "2019-04-11T15:11:47.798450Z",
            "project" : "bLwQYp24jRG2YyAxGaGGwMg",
            "project_name" : "",
            "description" : "",
            "server" : "https://meuleman-higlass-us-west-2.altius.org/api/v1",
            "tilesetUid" : "e7yehSFuSvWu0_9uEK1Apw",
            "uid" : "4fd8b376-f112-4839-a5e1-cb8b4d4907-a",
            "type" : "horizontal-chromosome-labels",
            "options" : {
              "color" : "#777777",
              "stroke" : "#FFFFFF",
              "fontSize" : 12,
              "fontIsAligned" : false,
              "showMousePosition" : true,
              "mousePositionColor" : "#999999",
              "name" : "chromosomes_hg38",
              "backgroundColor" : "white"
            },
            "height" : appChromosomeTrackHeight,
            "position" : "top",
          },
          {
            "uid": "seq_fasta_example",
            "type": "horizontal-sequence",
            "data": {
              "type": "fasta",
              "fastaUrl": hg38FastaURL,
              "faiUrl": hg38FastaIndexURL,
              "chromSizesUrl": hg38ChromsizesURL
            },
            "options": {
              "labelPosition": "hidden",
              "fontSize": 10,
              "fontFamily": "Helvetica",
              "fontColor": "white",
              "colorScale": appSequenceTrackColormap,
            },
            "height": appSequenceTrackHeight,
            "position": "top",
          },
          {
            "name": "spacer",
            "type": "empty",
            "height": appGapTrackHeight,
            "uid": "abcd",
          },
          {
            "type": "pileup",
            "height": 320,
            "options": {
              "axisPositionHorizontal": "right",
              "axisLabelFormatting": "normal",
              "outlineReadOnHover": "yes",
              // "groupBy": "strand",
              // "minusStrandColor": "#ebebeb",
              // "plusStrandColor": "#ebebeb",
              "showCoverage": false,
              "colorScale": [
                // A T G C N Other
                "#2c7bb6",
                "#92c5de",
                "#ffffbf",
                "#fdae61",
                "#808080",
                "#DCDCDC"
              ],
              "methylation": {
                "set": "control", 
                "hideSubstitutions": true,
                "categories": [
                  {"unmodifiedBase": "A", "code": "a", "strand": "+"},
                  {"unmodifiedBase": "T", "code": "a", "strand": "-"},
                  {"unmodifiedBase": "C", "code": "m", "strand": "+"},
                ],
                "colors": [
                  appDefaultFiberSeqReadControlHexColor, 
                  appDefaultFiberSeqReadControlHexColor,
                  appDefaultFiberSeqReadCpGHexColor,
                ],
                "categoryAbbreviations": [
                  'm6A+', 
                  'm6A-', 
                  '5mC+'
                ],
                "probabilityThresholdRange": appDefaultProbabilityThresholdRange,
              },
              "showLoadingText": false,
              "showMousePosition" : true,
            },
            "uid": "FylkvVBTSumoJ959H-5A-1",
            "data": {
              "type": "bam",
              "bamUrl": hudepTestControlTestBAMURL,
              "baiUrl": hudepTestControlTestBAIURL,
              "chromSizesUrl": hg38ChromsizesURL,
              "options": {
                  "maxTileWidth": appDefaultTileWidth,
              },
            },
          },
          {
            "name": "gencode.v38.annotation.gtf.higlass-transcripts.hgnc.090721.forceHGNC.coloredByVocabulary.beddb",
            "server" : "https://meuleman-higlass-us-west-2.altius.org/api/v1",
            "tilesetUid": "cv0JX4TlTIi-D1aEpV-C0A",
            "type": "horizontal-transcripts",
            "uid": "cv0JX4TlTIi-D1aEpV-C0A",
            "options": {
              "blockStyle": "directional", // "UCSC-like",
              "maxRows": 6,
              "maxTexts": 50,
              "labelFontSize": 10,
              "labelFontWeight": 500,
              "transcriptHeight": 14,
              "transcriptSpacing": 4,
              "showMousePosition": true,
              "startCollapsed": false,
              "showToggleTranscriptsButton": false,
              "utrColor": "grey",
              "plusStrandColor": "#111111",
              "minusStrandColor": "#111111",
              "trackMargin": {top:10, bottom:10, left:0, right:0},
              "blockCalculateTranscriptCounts": true,
              "highlightTranscriptType": "longestIsoform",
              "highlightTranscriptTrackBackgroundColor": "#fdcfcf",
              "sequenceData": { // If this is set, transcribed amino acids are displayed when sufficiently zoomed in
                "type": "fasta",
                "fastaUrl": "https://aveit.s3.amazonaws.com/higlass/data/sequence/hg38.fa",
                "faiUrl": "https://aveit.s3.amazonaws.com/higlass/data/sequence/hg38.fa.fai",
                "chromSizesUrl": "https://aveit.s3.amazonaws.com/higlass/data/sequence/hg38.mod.chrom.sizes"
              },
            },
            "height" : appGeneAnnotationTrackHeight,
          },
          {
            "name": "HUDEP.control.DS182418.chr11.m6aEventsPerBaseMeanWithClipped.filtered.versionSort.bedgraph.bw",
            "type": "bar",
            "height": appCoverageTrackHeight,
            "server" : "https://meuleman-higlass-us-west-2.altius.org/api/v1",
            "tilesetUid" : "VDUE1tG2TTKw8OKAZK6HmA",
            "uid" : "bwtest-001",
            "options" : {
              "labelPosition": "hidden",
              "name": "HUDEP.control.DS182418.chr11.m6aEventsPerBaseMeanWithClipped",
              "valueScaling": "linear",
              "valueScaleMin": 0,
              // "valueScaleMax": 20,
              // "lineStrokeWidth": 1,
              // "lineStrokeColor": appDefaultFiberSeqReadControlHexColor,
              "colorRange": ['#FFFFFF', appDefaultFiberSeqReadControlHexColor],
              "showMousePosition" : true,
              "showTooltip": true,
              "minHeight": appCoverageTrackHeight,
            },
          },
          {
            "name": "spacer",
            "type": "empty",
            "height": appGapTrackHeight,
            "uid": "abcd",
          },
        ]
      },
      "layout": {
        "w": 12,
        "h": 12,
        "x": 0,
        "y": 0,
      }
    }
  ]
}

export const bigWigUids = {
  'HUDEP': {
    'control': {
      'm6aEventsPerBaseMeanWithClipped': {
        'chr1': 'OCk8dEaTTwGec0WM75uENg',
        'chr2': 'C-lUbMgwRjK9BvTN4lD2zA',
        'chr3': 'SLFG5QluSMqZyYNFZIhVnA',
        'chr4': 'Ffq7GhfXROKoZS0JwR5F_A',
        'chr5': 'TjIAHXBETQCWYzZMH7uwiA',
        'chr6': 'QErVVkECSjWII3DkajV1oA',
        'chr7': 'EcpRu1JYRT-4aTdk1iu6fA',
        'chr8': 'DkLF_u5BTMe0OuBPtTphdg',
        'chr9': 'PCxXuumtS9CT6skPn13Ocw',
        'chr10': 'LrLW61YkQb2gHjRC_LtiNg',
        'chr11': 'VDUE1tG2TTKw8OKAZK6HmA',
        'chr12': 'Smpz9ThdT1qZiSbZ1nN6nA',
        'chr13': 'YOKgoulrRsej8sehVYCCXQ',
        'chr14': 'KmaCLmlQSwuVwpx7AQIJLA',
        'chr15': 'egJXBfoESlS70dpvsqBFSg',
        'chr16': 'TaACBq7vRJuc-NxfSuWYXQ',
        'chr17': 'ek1sOUqqRtWwyjCWTq2j7w',
        'chr18': 'YbmXDMj5R1Cu1LheQfnANg',
        'chr19': 'X-BhEZ1sTC6ac24OMqzJHQ',
        'chr20': 'Bwms5ZGPTH-05focwH3b-g',
        'chr21': 'CaiZIeLSQRey-nglJ7BTbA',
        'chr22': 'SR11HfLrRPGBT-OPgHLcOg',
        'chrX': 'LBRG6hYcSpaNSViQY1R3pQ',
        'chrY': 'T8lgYf0dTdGhtYvNre4GEA',
      }
    },
    'treatment': {
      'm6aEventsPerBaseMeanWithClipped': {
        'chr1': 'd86BH4NfSASZ6E3Nv0srsA',
        'chr2': 'W1eluMEKQFOK1dLTcrSMqQ',
        'chr3': 'MTv8cAV5TjKpoPqbkEwq8w',
        'chr4': 'LLST_zeCSciTU4SETxoKSA',
        'chr5': 'fwjQZLhVRFeC4YBCc6AkUw',
        'chr6': 'HjEMu_RlQq2AQ0eU3PQcHA',
        'chr7': 'Lt_PMux2Rhm1J9AuoTHLIQ',
        'chr8': 'aJFTEs9KSa6Nae3G74VBbg',
        'chr9': 'XqKXMjePR1CHynOTHUFaWw',
        'chr10': 'LpkzNeJhTaaugE7K4JtcBg',
        'chr11': 'c62Pg3vKQta7eGi5k3-QHA',
        'chr12': 'Uar_Rt8GREKncj5XnI2DPg',
        'chr13': 'cskZiSHmSIqNE0VjhPtX3A',
        'chr14': 'O-0QxkawTR-mOnCwCmCRMA',
        'chr15': 'CaoHjRU6RuWxIcg4TrN2wA',
        'chr16': 'e0UYFRrtQQ6kb9ZKvhxLEg',
        'chr17': 'f3NLhKnURuanu9kWDNFftA',
        'chr18': 'dNoJ2MNsRsSjQc1n4ScULA',
        'chr19': 'dLjRICWFTmawuV2LSVh2pg',
        'chr20': 'Xh6v2JdfT_yFI-K-X1BSgw',
        'chr21': 'N-x7V2ZsTt2PQDjGjCDXiQ',
        'chr22': 'VmmHiKlmQ_W8id5sXaPlRA',
        'chrX': 'bOqT61ehS3OTdg6gayMnmw',
        'chrY': 'd9oOgANSQtW-bL5R_HdBmA',
      }
    },
    'log2FC': {
      'm6aEventsPerBaseMeanWithClipped': {
        'chr1': 'MDRxXd28Qkein1S5vTyW3A',
        'chr2': 'H6OwWXpaTuqKtvK7wJwXwQ',
        'chr3': 'RjHHoMaSSNiUXfCGWkstiA',
        'chr4': 'EHZAUWBjSDKfxStnA0ueAg',
        'chr5': 'PM-ASwDKTqODKiqUVGiUqw',
        'chr6': 'BORUbRK4TdWFbMz8Xzof6Q',
        'chr7': 'WipheiBoQZK9WOsT_4J3KQ',
        'chr8': 'aHMfFz08ScSy-QWs1Ck6zA',
        'chr9': 'N9nD6F1GQEe7cW9hzoTgjw',
        'chr10': 'c7tRCbAbQJykYZyFG0TCsw',
        'chr11': 'cuEU2GCaQv6zfZ5X4yu02Q',
        'chr12': 'd2K5d_X-Q-i8CcRrj-t1Ow',
        'chr13': 'CBG4rHRyTFWtkvzoVB3ztw',
        'chr14': 'bHp2mPXlSu6qFMRydWDQXg',
        'chr15': 'eqY4YV4UQE-RSdXLt0aGCg',
        'chr16': 'ZM-cr0iPSC20ftNPXvMdUw',
        'chr17': 'LBKcOQToQz6AqumjfUt4Qg',
        'chr18': 'DZNwds7lSVyhz5MnzUgTWg',
        'chr19': 'RQpLWnoqQr-Wb-AsVrBWfQ',
        'chr20': 'bhDpuUgJQOmibmbKVcgAGA',
        'chr21': 'NFRV6TTdSWuhyhlU5I_eJQ',
        'chr22': 'cU6I258ZTi2RCmP7fsVbfQ',
        'chrX': 'JtzU9OXXQpKEmLWfFgZ7Ag',
        'chrY': 'MaxZ3l4dSfiAIRH0LOZsOw',
      }
    }
  }
}

export const hudepControlTestBAMURL = "https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/HUDEP.control.DS182418.chr11.bam";
export const hudepControlTestBAIURL = "https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/HUDEP.control.DS182418.chr11.bam.bai";
export const hudepTreatmentTestBAMURL = "https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/HUDEP.treatment.DS182417.chr11.bam";
export const hudepTreatmentTestBAIURL = "https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/HUDEP.treatment.DS182417.chr11.bam.bai";

export const hudepHiglassPileupViewconf = {
  "editable": true,
  "zoomFixed" : false,
  "trackSourceServers": [
    "/api/v1",
    "http://higlass.io/api/v1"
  ],
  "exportViewUrl": "/api/v1/viewconfs",
  "views": [
    {
      "uid" : "abcd0002",
      "initialXDomain": [
        1813933893,
        1813936188
      ],
      "genomePositionSearchBoxVisible" : true,
      "genomePositionSearchBox" : {
        "autocompleteServer" : "http://higlass.io/api/v1",
        "chromInfoServer" : "http://higlass.io/api/v1",
        "visible" : true,
        "chromInfoId" : "hg38"
      },
      "tracks": {
        "top": [
          {
            "name" : "chromosomes_hg38",
            "created" : "2019-04-11T15:11:47.798450Z",
            "project" : "bLwQYp24jRG2YyAxGaGGwMg",
            "project_name" : "",
            "description" : "",
            "server" : "https://meuleman-higlass-us-west-2.altius.org/api/v1",
            "tilesetUid" : "e7yehSFuSvWu0_9uEK1Apw",
            "uid" : "4fd8b376-f112-4839-a5e1-cb8b4d4907-a",
            "type" : "horizontal-chromosome-labels",
            "options" : {
              "color" : "#777777",
              "stroke" : "#FFFFFF",
              "fontSize" : 12,
              "fontIsAligned" : false,
              "showMousePosition" : true,
              "mousePositionColor" : "#999999",
              "name" : "chromosomes_hg38",
              "backgroundColor" : "white"
            },
            "height" : appChromosomeTrackHeight,
            "position" : "top",
          },
          {
            "uid": "seq_fasta_example",
            "type": "horizontal-sequence",
            "data": {
              "type": "fasta",
              "fastaUrl": hg38FastaURL,
              "faiUrl": hg38FastaIndexURL,
              "chromSizesUrl": hg38ChromsizesURL
            },
            "options": {
              "labelPosition": "hidden",
              "fontSize": 10,
              "fontFamily": "Helvetica",
              "fontColor": "white",
              "colorScale": appSequenceTrackColormap,
            },
            "height": appSequenceTrackHeight,
            "position": "top",
          },
          {
            "name": "spacer",
            "type": "empty",
            "height": appGapTrackHeight,
            "uid": "abcd",
          },
          {
            "type": "pileup",
            "height": 320,
            "options": {
              "axisPositionHorizontal": "right",
              "axisLabelFormatting": "normal",
              "outlineReadOnHover": "yes",
              // "groupBy": "strand",
              // "minusStrandColor": "#ebebeb",
              // "plusStrandColor": "#ebebeb",
              "showCoverage": false,
              "colorScale": [
                // A T G C N Other
                "#2c7bb6",
                "#92c5de",
                "#ffffbf",
                "#fdae61",
                "#808080",
                "#DCDCDC"
              ],
              "methylation": {
                "group": "HUDEP",
                "set": "control", 
                "hideSubstitutions": true,
                "categories": [
                  {"unmodifiedBase": "A", "code": "a", "strand": "+"},
                  {"unmodifiedBase": "T", "code": "a", "strand": "-"},
                  {"unmodifiedBase": "C", "code": "m", "strand": "+"},
                ],
                "colors": [
                  appDefaultFiberSeqReadControlHexColor, 
                  appDefaultFiberSeqReadControlHexColor,
                  appDefaultFiberSeqReadCpGHexColor,
                ],
                "categoryAbbreviations": ['m6A+', 'm6A-', '5mC+'],
                "probabilityThresholdRange": appDefaultProbabilityThresholdRange,
              },
              "showLoadingText": false,
              "showMousePosition" : true,
            },
            "uid": "FylkvVBTSumoJ959H-5A-1",
            "data": {
              "type": "bam",
              "bamUrl": hudepControlTestBAMURL,
              "baiUrl": hudepControlTestBAIURL,
              "chromSizesUrl": hg38ChromsizesURL,
              "options": {
                  "maxTileWidth": appDefaultTileWidth,
              },
            },
          },
          {
            "name": "spacer",
            "type": "empty",
            "height": appGapTrackHeight,
            "uid": "abcd",
          },
          {
            "type": "pileup",
            "height": 320,
            "options": {
              "axisPositionHorizontal": "right",
              "axisLabelFormatting": "normal",
              "outlineReadOnHover": "yes",
              // "groupBy": "strand",
              // "minusStrandColor": "#ebebeb",
              // "plusStrandColor": "#ebebeb",
              "showCoverage": false,
              "colorScale": [
                // A T G C N Other
                "#2c7bb6",
                "#92c5de",
                "#ffffbf",
                "#fdae61",
                "#808080",
                "#DCDCDC"
              ],
              "methylation": {
                "group": "HUDEP",
                "set": "treatment",
                "hideSubstitutions": true,
                "categories": [
                  {"unmodifiedBase": "A", "code": "a", "strand": "+"},
                  {"unmodifiedBase": "T", "code": "a", "strand": "-"},
                  {"unmodifiedBase": "C", "code": "m", "strand": "+"},
                ],
                "colors": [
                  appDefaultFiberSeqReadTreatmentHexColor, 
                  appDefaultFiberSeqReadTreatmentHexColor,
                  appDefaultFiberSeqReadCpGHexColor,
                ],
                "categoryAbbreviations": ['m6A+', 'm6A-', '5mC+'],
                "probabilityThresholdRange": appDefaultProbabilityThresholdRange,
              },
              "showLoadingText": false,
              "showMousePosition" : true,
            },
            "uid": "FylkvVBTSumoJ959H-5A-2",
            "data": {
              "type": "bam",
              "bamUrl": hudepTreatmentTestBAMURL,
              "baiUrl": hudepTreatmentTestBAIURL,
              "chromSizesUrl": hg38ChromsizesURL,
              "options": {
                  "maxTileWidth": appDefaultTileWidth,
              },
            },
          },
          {
            "name": "gencode.v38.annotation.gtf.higlass-transcripts.hgnc.090721.forceHGNC.coloredByVocabulary.beddb",
            "server" : "https://meuleman-higlass-us-west-2.altius.org/api/v1",
            "tilesetUid": "cv0JX4TlTIi-D1aEpV-C0A",
            "type": "horizontal-transcripts",
            "uid": "cv0JX4TlTIi-D1aEpV-C0A",
            "options": {
              "blockStyle": "directional", // "UCSC-like",
              "maxRows": 6,
              "maxTexts": 50,
              "labelFontSize": 8,
              "labelFontWeight": 500,
              "transcriptHeight": 12,
              "transcriptSpacing": 2,
              "showMousePosition": true,
              "startCollapsed": false,
              "showToggleTranscriptsButton": false,
              "utrColor": "grey",
              "plusStrandColor": "#111111",
              "minusStrandColor": "#111111",
              "trackMargin": {top:10, bottom:10, left:0, right:0},
              "blockCalculateTranscriptCounts": true,
              "highlightTranscriptType": "longestIsoform",
              "highlightTranscriptTrackBackgroundColor": "#fdcfcf",
              // "sequenceData": { // If this is set, transcribed amino acids are displayed when sufficiently zoomed in
              //   "type": "fasta",
              //   "fastaUrl": "https://aveit.s3.amazonaws.com/higlass/data/sequence/hg38.fa",
              //   "faiUrl": "https://aveit.s3.amazonaws.com/higlass/data/sequence/hg38.fa.fai",
              //   "chromSizesUrl": "https://aveit.s3.amazonaws.com/higlass/data/sequence/hg38.mod.chrom.sizes"
              // },
            },
            "height" : appGeneAnnotationTrackHeight,
          },
          {
            "name": "HUDEP.control.DS182418.chr11.m6aEventsPerBaseMeanWithClipped.filtered.versionSort.bedgraph.bw",
            "group": "HUDEP",
            "set": "control",
            "type": "bar",
            "height": appCoverageTrackHeight,
            "server" : "https://meuleman-higlass-us-west-2.altius.org/api/v1",
            "tilesetUid" : "VDUE1tG2TTKw8OKAZK6HmA",
            "uid" : "bwtest-001",
            "options" : {
              "labelPosition": "hidden",
              "name": "HUDEP.control.DS182418.chr11.m6aEventsPerBaseMeanWithClipped",
              "valueScaling": "linear",
              "valueScaleMin": 0,
              // "valueScaleMax": 20,
              // "lineStrokeWidth": 1,
              // "lineStrokeColor": appDefaultFiberSeqReadControlHexColor,
              "colorRange": ['#FFFFFF', appDefaultFiberSeqReadControlHexColor],
              "showMousePosition" : true,
              "showTooltip": true,
              "minHeight": appCoverageTrackHeight,
            },
          },
          {
            "name": "HUDEP.treatment.DS182417.chr11.m6aEventsPerBaseMeanWithClipped.filtered.versionSort.bedgraph.bw",
            "group": "HUDEP",
            "set": "control",
            "type": "bar",
            "height": appCoverageTrackHeight,
            "server" : "https://meuleman-higlass-us-west-2.altius.org/api/v1",
            "tilesetUid" : "c62Pg3vKQta7eGi5k3-QHA",
            "uid" : "bwtest-002",
            "options" : {
              "labelPosition": "hidden",
              "name": "HUDEP.treatment.DS182417.chr11.m6aEventsPerBaseMeanWithClipped",
              "valueScaling": "linear",
              "valueScaleMin": 0,
              // "valueScaleMax": 20,
              // "lineStrokeWidth": 1,
              // "lineStrokeColor": appDefaultFiberSeqReadTreatmentHexColor,
              "colorRange": ['#FFFFFF', appDefaultFiberSeqReadTreatmentHexColor],
              "showMousePosition" : true,
              "showTooltip": true,
              "minHeight": appCoverageTrackHeight,
            },
          },
          {
            "name": "spacer",
            "type": "empty",
            "height": appGapTrackHeight,
            "uid": "abcd",
          },
          {
            "name": "HUDEP.log2.control.DS182418.over.treatment.DS182417.chr11.m6aEventsPerBaseMeanWithClipped.filtered.versionSort.bedgraph.bw",
            "group": "HUDEP",
            "set": "log2FC",
            "type": "1d-heatmap",
            "height": appCoverageTrackHeight,
            "server" : "https://meuleman-higlass-us-west-2.altius.org/api/v1",
            "tilesetUid" : "cuEU2GCaQv6zfZ5X4yu02Q",
            "uid" : "bwtest-003",
            "options" : {
              "labelPosition": "hidden",
              "name": "HUDEP.log2.control.DS182418.over.treatment.DS182417.chr11.m6aEventsPerBaseMeanWithClipped.filtered.versionSort.bedgraph.bw",
              "valueScaling": "linear",
              "valueScaleMin": -2,
              "valueScaleMax": 2,
              "colorRange": appDefaultFiberSeqReadFoldChangeHexColormap,
              "showMousePosition" : true,
              "showTooltip": true,
              "minHeight": appCoverageTrackHeight,
            },
          },
          {
            "name": "spacer",
            "type": "empty",
            "height": appGapTrackHeight,
            "uid": "abcd",
          },
        ]
      },
      "layout": {
        "w": 12,
        "h": 12,
        "x": 0,
        "y": 0,
      }
    }
  ]
}