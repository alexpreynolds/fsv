export const testHiglassChromsizesURL = "https://pkerp.s3.amazonaws.com/public/bamfile_test/GCF_000005845.2_ASM584v2_genomic.chrom.sizes";

export const testHiglassPileupViewconf = {
  "editable": true,
  "trackSourceServers": [
    "http://higlass.io/api/v1"
  ],
  "exportViewUrl": "/api/v1/viewconfs",
  "views": [
    {
      "uid" : "CLH4ybW8ToynSKBby7aB4g",
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
                  "maxTileWidth": 300000
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
        "i" : "CLH4ybW8ToynSKBby7aB4g",
        "moved" : false,
        "static" : false
      }
    }
  ]
}

export const gimelbrantTestBAMURL = "https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/fsv.d2.stim.chr11.bam";
export const gimelbrantTestBAIURL = "https://areynolds-us-west-2.s3.us-west-2.amazonaws.com/fsv.d2.stim.chr11.bam.bai";
export const hg38ChromsizesURL = "https://areynolds-us-west-2.s3.amazonaws.com/hg38.meuleman.fixedBin.chrom.sizes";

export const gimelbrantHiglassPileupViewconf = {
  "editable": true,
  "zoomFixed" : false,
  "trackSourceServers": [
    "/api/v1",
    "http://higlass.io/api/v1"
  ],
  "exportViewUrl": "/api/v1/viewconfs",
  "views": [
    {
      "uid" : "abcd",
      "initialXDomain": [
        40000,
        60000
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
              "showMousePosition" : false,
              "mousePositionColor" : "#999999",
              "name" : "chromosomes_hg38",
              "backgroundColor" : "white"
            },
            "height" : 30,
            "position" : "top"
          },
          {
            "name" : "annotations_GENCODE_v28",
            "created" : "2019-04-11T15:12:04.391612Z",
            "project" : "bLwQYp24jRG2YyAxGaGGwMg",
            "project_name" : "",
            "description" : "",
            "server" : "https://meuleman-higlass-us-west-2.altius.org/api/v1",
            "tilesetUid" : "OAc6qvgJRP2cEr78Eoj79w",
            "uid" : "d3c2b209-63e6-4fa3-97d0-9d2ddccdf04e",
            "type" : "horizontal-gene-annotations",
            "options" : {
              "fontSize" : 11,
              "labelColor" : "black",
              "labelPosition" : "hidden",
              "labelLeftMargin" : 0,
              "labelRightMargin" : 0,
              "labelTopMargin" : 0,
              "labelBottomMargin" : 0,
              "plusStrandColor" : "blue",
              "minusStrandColor" : "red",
              "trackBorderWidth" : 0,
              "trackBorderColor" : "black",
              "showMousePosition" : false,
              "mousePositionColor" : "#999999",
              "geneAnnotationHeight" : 10,
              "geneLabelPosition" : "outside",
              "geneStrandSpacing" : 4,
              "name" : "annotations_GENCODE_v28",
              "backgroundColor" : "white"
            },
            "height" : 80,
            "header" : "1\t2\t3\t4\t5\t6\t7\t8\t9\t10\t11\t12\t13\t14",
            "position" : "top"
          },
          {
            "type": "pileup",
            "height": 640,
            "options": {
              "axisPositionHorizontal": "right",
              "axisLabelFormatting": "normal",
              "showCoverage": false,
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
              "bamUrl": gimelbrantTestBAMURL,
              "baiUrl": gimelbrantTestBAIURL,
              "chromSizesUrl": hg38ChromsizesURL,
              "options": {
                  "maxTileWidth": 30000
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
