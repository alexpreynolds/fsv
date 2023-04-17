export const testHiglassPileupViewconf = {
    "editable": true,
    "trackSourceServers": [
      "http://higlass.io/api/v1"
    ],
    "exportViewUrl": "/api/v1/viewconfs",
    "views": [
      {
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
                "chromSizesUrl": "https://pkerp.s3.amazonaws.com/public/bamfile_test/GCF_000005845.2_ASM584v2_genomic.chrom.sizes",
                "options": {
                    "maxTileWidth": 30000
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