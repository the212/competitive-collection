module.exports = {

  getContentMatchObject: function() {

    //TODO: add different weight to different keywords
    var contentMatch = {

      product_marketing: [
        "exclusive",
        "feature",
        "offer",
        "promotion",
        "new feature",
        "now offer",
      ],

      market_funding: [
        "financing",
        "market size",
        "raised",
        "seed round",
        "series a",
        "series b",
        "series c"
      ],

      status_growth: [
        "followers",
        "hire",
        "hiring",
        "reached",
        "users"
      ]

    } // end contentMatch object

    return contentMatch;

  }, // end getContentMatchObject

  getPlatedMatchObject: function() {

    var platedMatch = {

      competition: [

        { name: 'blue apron',
          twitter_user_id: 123,
          twitter_handle: '',
          website: '',
          emails: ["blueapron@e.blueapron.com"],
          //TODO: add Linked-In references
          //TODO: add correct twitter_id and handle
          leaders : [
            {
              name: 'matthew wadiak',
              role: 'f',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'matt salzberg',
              role: 'ceo',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'ilia papas',
              role: 'cto',
              twitter_user_id: 123,
              twitter_handle: '',
            },
          ],
          //TODO: add Linked-In references
          //TODO: add correct twitter_id and handle
          investors : [
            {
              name: 'first round',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'boxgroup',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'graph ventures',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'bessemer venture partners',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'david tisch',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'stripes group',
              twitter_user_id: 123,
              twitter_handle: '',
            },
          ]

        },

        { name: 'hello fresh',
          twitter_user_id: 123,
          twitter_handle: '',
          website: '',
          emails: ["hello@hellofresh.com", "no-reply@hellofresh.com"],
          leaders : [
            {
              name: 'dominik richter',
              role: 'ceo',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'diogo cruz',
              role: 'f',
              twitter_user_id: 123,
              twitter_handle: '',
            }
          ],
          investors : [
            {
              name: 'rocket internet',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'insight venture partners',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'phenomen ventures',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'hv holtzbrink ventures',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'vorwerk direct selling ventures',
              twitter_user_id: 123,
              twitter_handle: '',
            },
          ]

        },

        { name: 'munchery',
          twitter_user_id: 123,
          twitter_handle: '',
          website: '',
          emails: ["", ],
          leaders : [
            {
              name: 'conrad chu',
              role: 'f',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'van tran',
              role: 'f',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'tri tran',
              role: 'f',
              twitter_user_id: 123,
              twitter_handle: '',
            }
          ],
          investors : [
            {
              name: 'spring ventures',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'eric ries',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'e.ventures',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'menlo ventures',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'sherpa ventures',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'greycroft partners',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: '137 ventures',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'mousee partners',
              twitter_user_id: 123,
              twitter_handle: '',
            },
            {
              name: 'northgate capital',
              twitter_user_id: 123,
              twitter_handle: '',
            },
          ]

        },

      ], //end competition array

      //TODO: add weight to different keywords
      keywords : [
        "build your own meal",
        "chef-made meal",
        "cook at home",
        "cooking made easy",
        "cooking made simple",
        "daily menu",
        "dinner simplified",
        "dinner kit",
        "deliver",
        "delivery",
        "do-it-yourself meal kit",
        "grocery delivery",
        "meal box",
        "meal delivery",
        "meal kit",
        "meal subscription",
        "prepared ingredients",
        "prep cook",
        "pre-measured ingredients",
        "pre-portioned",
        "ready-to-cook",
        "recipe delivery service",
        "step-by-step recipies",
        "subscription meal kit",
        "tailored recipes",
        "weekly meal delivery",
        "weekly recipes"
      ] // end keywords array

    } //end platedMatch object

    return platedMatch;

  }, // end getPlatedMatchOption

  getCompanyMatch: function(companyObject) {
    var companyMatch = [];

    companyObject.competition.forEach(function(element, index) {

        companyMatch.push(element.name);
        
        element.leaders.forEach(function(item, i) {
          companyMatch.push(item.name);
        });

        element.investors.forEach(function(item, i) {
          companyMatch.push(item.name);
        });

    });

    return companyMatch;

  }


} // end module export 