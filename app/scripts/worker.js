self.importScripts('../scripts/qrclient.js');
var client = new QRClient();
onmessage = function(e) {
 client.decode(e.data.imageData, function(result) {
        if(result !== undefined) {
          e.data.currentUrl = result;
        }
          postMessage(result);
      });

}




    var myWorker = new Worker('../scripts/worker.js');


    var client = new QRClient();

    var self = this;

    this.currentUrl = undefined;


    this.detectQRCode = function(imageData, callback) {
      callback = callback || function() {};

      myWorker.postMessage({imageData:imageData, currentUrl:self.currentUrl});
      myWorker.onmessage = function onImageDeode(e) {
        callback(e)
      };
      // client.decode(imageData, function(result) {
      //   if(result !== undefined) {
      //     self.currentUrl = result;
      //   }
      //   callback(result);
      // });
    };

