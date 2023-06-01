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
};

export const appModeLabels = {
  "test" : "test",
  "cd3pos" : "cd3pos",
  "hudep" : "hudep",
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
export const appCoverageTrackHeight = 20;
export const appGeneAnnotationTrackHeight = 120;
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
export const appDefaultM6AEventCategoryAbbreviations = ['m6A'];
export const appDefaultHgView5mCEventViewable = true;
export const appDefault5mCEventCategories = [
  {"unmodifiedBase": "C", "code": "m", "strand": "+"},
];
export const appDefault5mCEventColors = [
  appDefaultFiberSeqReadCpGHexColor,
];
export const appDefault5mCEventCategoryAbbreviations = ['5mC'];

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
    'chr1':{'ub':248956422},
    'chr10':{'ub':133797422},
    'chr11':{'ub':135086622},
    'chr12':{'ub':133275309},
    'chr13':{'ub':114364328},
    'chr14':{'ub':107043718},
    'chr15':{'ub':101991189}, 
    'chr16':{'ub':90338345},
    'chr17':{'ub':83257441},
    'chr18':{'ub':80373285},
    'chr19':{'ub':58617616},
    'chr2':{'ub':242193529},
    'chr20':{'ub':64444167},
    'chr21':{'ub':46709983},
    'chr22':{'ub':50818468},
    'chr3':{'ub':198295559},
    'chr4':{'ub':190214555},
    'chr5':{'ub':181538259},
    'chr6':{'ub':170805979},
    'chr7':{'ub':159345973},
    'chr8':{'ub':145138636},
    'chr9':{'ub':138394717},
    'chrX':{'ub':156040895},
    'chrY':{'ub':57227415},
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

export const testHiglassChromsizesURL = "https://pkerp.s3.amazonaws.com/public/bamfile_test/GCF_000005845.2_ASM584v2_genomic.chrom.sizes";

export const hg38ChromsizesURL = "https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chrom.sizes";

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
            "type": "bar", // "1d-heatmap", // "horizontal-line",
            "height": appCoverageTrackHeight,
            "server" : "https://meuleman-higlass-us-west-2.altius.org/api/v1",
            "tilesetUid" : "WS0YhpG8S4CXn62fhLXwXg",
            "uid" : "bwtest-001",
            "options" : {
              "labelPosition": "hidden",
              "name": "fsv.d2.stim.chr11.m6aEventsPerBaseMeanWithClipped.filtered.versionSort.bedgraph.bw",
              "valueScaling": "linear",
              "valueScaleMin": 0,
              // "valueScaleMax": 20,
              // "lineStrokeWidth": 1,
              // "lineStrokeColor": appDefaultFiberSeqReadHexColor,
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
                "categoryAbbreviations": ['m6A', '5mC'],
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
            "position" : "top"
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
                "categoryAbbreviations": ['m6A', '5mC'],
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
                "categoryAbbreviations": ['m6A', '5mC'],
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
            "name": "HUDEP.treatment.DS182417.chr11.m6aEventsPerBaseMeanWithClipped.filtered.versionSort.bedgraph.bw",
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