(function() {
    var app = angular.module('store', []);

    app.controller('SalutController', function() {
        this.salutations = personalSalutations;
    });

    app.directive('panels', function() {
        return {
            restrict: 'E',
            templateUrl: 'panels.html',
            controller: function() {
                this.tab = 1;

                this.setTab = function(newValue){
                    this.tab = newValue;
                };

                this.isSet = function(tabName){
                    return this.tab === tabName;
                };
            },
            controllerAs: 'tabController'
        }
    });

    app.factory('Base64', function() {
        var keyStr = 'ABCDEFGHIJKLMNOP' +
            'QRSTUVWXYZabcdef' +
            'ghijklmnopqrstuv' +
            'wxyz0123456789+/' +
            '=';
        return {
            encode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                do {
                    chr1 = input.charCodeAt(i++);
                    chr2 = input.charCodeAt(i++);
                    chr3 = input.charCodeAt(i++);

                    enc1 = chr1 >> 2;
                    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                    enc4 = chr3 & 63;

                    if (isNaN(chr2)) {
                        enc3 = enc4 = 64;
                    } else if (isNaN(chr3)) {
                        enc4 = 64;
                    }

                    output = output +
                        keyStr.charAt(enc1) +
                        keyStr.charAt(enc2) +
                        keyStr.charAt(enc3) +
                        keyStr.charAt(enc4);
                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";
                } while (i < input.length);

                return output;
            },

            decode: function (input) {
                var output = "";
                var chr1, chr2, chr3 = "";
                var enc1, enc2, enc3, enc4 = "";
                var i = 0;

                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    alert("There were invalid base64 characters in the input text.\n" +
                        "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                        "Expect errors in decoding.");
                }
                input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

                do {
                    enc1 = keyStr.indexOf(input.charAt(i++));
                    enc2 = keyStr.indexOf(input.charAt(i++));
                    enc3 = keyStr.indexOf(input.charAt(i++));
                    enc4 = keyStr.indexOf(input.charAt(i++));

                    chr1 = (enc1 << 2) | (enc2 >> 4);
                    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                    chr3 = ((enc3 & 3) << 6) | enc4;

                    output = output + String.fromCharCode(chr1);

                    if (enc3 != 64) {
                        output = output + String.fromCharCode(chr2);
                    }
                    if (enc4 != 64) {
                        output = output + String.fromCharCode(chr3);
                    }

                    chr1 = chr2 = chr3 = "";
                    enc1 = enc2 = enc3 = enc4 = "";

                } while (i < input.length);

                return output;
            }
        };
    });

    app.controller('GalleryController', ['$http', '$log', 'Base64', function($http, $log, Base64) {
        this.current = 0;
        //$http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode('dev' + ':' + 'dev');
        //$http.defaults.headers.common['Access-Control-Allow-Origin'] = "*";
        //this.apps = $http.get('http://192.168.11.101:8080/v2/apps');
        //$log.info("Log " + this.apps);
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET","http://192.168.11.101:8080/v2/apps",true);
        xmlHttp.send();
        this.setCurrent = function(c) {
            if (c) {
                this.current = c;
            } else {
                this.current = 0;
            }
        };

    }]);

    app.controller('CommentFormController', function() {
        this.comment = {
            stars: 2
        };

        this.addComment = function(salut) {
            salut.comments.push(this.comment);
            this.comment = {};
        };

    });

    var personalSalutations = [
        {
            salut: "Hello",
            user: "Haris",
            isHere: true,
            born: new Date(1979, 04, 12, 20, 20, 0, 0),
            pics: [
                "http://www.iconwala.com/Icons/Face-Avatars-Icons/Png/Male-Face-H3-icon-2013103.PNG",
                "http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-O4-icon.png"
            ],
            comments: [
                {
                    stars: 4,
                    body: "blah blah blah",
                    author: "Alpha Reviewer"
                }
            ]
        },
        {
            salut: "Bonjour",
            user: "Anthi",
            isHere: true,
            born: new Date(1983, 09, 02, 10, 20, 0, 0),
            pics: [
                "http://wwww.veryicon.com/icon/128/Avatar/Face%20Avatars/Female%20Face%20FC%204.png",
                "http://emojipedia.org/wp-content/uploads/2014/04/128x128x1f60d-google-android.png.pagespeed.ic.yLwbJ0broV.png"
            ]
        }
    ];
})();
