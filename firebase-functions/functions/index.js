const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

var request = require('request');


const fs = admin.firestore();

exports.detailEvent = functions.firestore.document('movements/{mid}/details/{did}').onWrite(event => {
    //const fs = admin.firestore();
    const mid = event.params.mid;
    var info = event.data;
    var oldDoc = info.previous;
    var oldVal = oldDoc.data();
    var newVal = {};
    try{
        newVal = info.data();
    }
    catch(e){
        console.log('det delete: ', oldVal);
    }
    if (newVal){
        if (oldVal){
            console.log('mov update: ', newVal);
            if (newVal.subtotal == oldVal.subtotal) return oldVal;
            const mref = fs.collection('movements').doc(mid);
            return mref.get().then(docMov => {
                const mov = docMov.data();
                var dif = newVal.subtotal - oldVal.subtotal;
                mov.amount += dif;
                return mref.set(mov).then(dt => {
                    console.log('update mov ok');
                    updateClient(mov, dif);
                });
            }).catch(reason => {
                console.log('update error: ',reason);
            });
        }
        else{
            console.log('mov add: ', newVal);
            const mref = fs.collection('movements').doc(mid);
            return mref.get().then(docMov => {
                const mov = docMov.data();
                var dif = newVal.subtotal - 0;
                return mref.set(mov).then(dt => {
                    console.log('create mov ok');
                    updateClient(mov, dif);
                });
            }).catch(reason => {
                console.log('creation error: ',reason);
            });
        }
    }
});
exports.movementEvent = functions.firestore.document('movements/{mid}').onWrite(event => {
    //const fs = admin.firestore();
    const mid = event.params.mid;
    var info = event.data;
    var oldDoc = info.previous;
    var oldVal = oldDoc.data();
    var newVal = {};
    try{
        newVal = info.data();
    }
    catch(e){
        console.log('mov delete: ', oldVal);
    }
    if (newVal){
        if (oldVal){
            console.log('mov update: ', newVal);
        }
        else{
            console.log('mov add: ', newVal);
        }
            
                //updateClient(newVal, dif);

        const dif = newVal.amount - oldVal.amount;

    }
});
exports.salesByDay = functions.https.onRequest((request, response) => {
    var yyyy = parseInt(request.query.yyyy,10);
    var mm = parseInt(request.query.mm,10);
    var dd = parseInt(request.query.dd,10);
    
    var d = new Date().setHours(0,0,0,0); //time ms format 00:00hs
    if (!isNaN(dd) && !isNaN(mm) && !isNaN(yyyy))
        d = new Date(yyyy, mm-1, dd).setHours(0,0,0,0);
    
    const t = addDays(d,1);
    const dstr = new Date(d);
    console.log('date: ', dstr);
    
    var totDay = 0;
    var totEF = 0;
    var totTG = 0;
    var totCC = 0;
    var totPC = 0;
    
    //const fs = admin.firestore();
    fs.collection('movements')
    .where('datetime', '>', d)
    .get()
    .then(moves => {
        const counter = moves.size;
        console.log('moves.size: ', counter);
        moves.forEach((item) => {
            var info = item.data();
            if (info){
                if (info.cp == 'CC') totCC += info.amount;
                if (info.cp == 'TG') totTG += info.amount;
                if (info.cp == 'PC') totPC += info.amount;
                if (info.cp == 'EF') totEF += info.amount;   
            }
        });
        totDay = totCC+totTG+totPC+totEF;
        
        fs.collection('salesByDay')
        .where('date', '==', d)
        .get()
        .then(sbd => {
            if (sbd.size == 0){ 
                var o = {
                    date:d,
                    dateStr:dstr,
                    total:totDay,
                    totalCC:totCC,
                    totalEF:totEF,
                    totalTG:totTG,
                    totalPC:totPC
                };
                fs.collection('salesByDay').add(o)
                .then(function(x) {
                    console.log("New record: ", x.id);
                    var str = 
                        "<div>Fecha: "+dstr+"</div>" +
                        "<div>----------------------------</div>"+
                        "<div>total EF : "+o.totalEF+"</div>"+
                        "<div>total TG : "+o.totalTG+"</div>"+
                        "<div>total CC : "+o.totalCC+"</div>"+
                        "<div>total PC : "+o.totalPC+"</div>"+
                        "<div>total    : "+o.total+"</div>"+
                        "<div>----------------------------</div>";
                    response.send(fillHtml(str));
                })
                .catch(function(error) {
                    console.error("Error adding: ", error);
                    response.send(fillHtml("Error adding: " + error));
                }); 
            }
            else{// update salesByDay
                sbd.forEach((item) => {
                    var o = item.data();
                    if (o){
                        o.total = totDay;
                        o.totalEF=totEF;
                        o.totalTG=totTG;
                        o.totalCC=totCC;
                        o.totalPC=totPC;

                        fs.collection('salesByDay').doc(item.id)
                        .set(o)
                        .then(x => {
                            console.log("Update record: ", x.id);
                            var str = 
                            "<div>Fecha: "+dstr+"</div>" +
                            "<div>-----------------------------</div>"+
                            "<div>Total     : "+o.total+"</div>"+
                            "<div>Total EF  : "+o.totalEF+"</div>"+
                            "<div>Total TG  : "+o.totalTG+"</div>"+
                            "<div>Total CC  : "+o.totalCC+"</div>"+
                            "<div>Total PC  : "+o.totalPC+"</div>"+
                            "<div>-----------------------------</div>";
                            response.send(fillHtml(str));
                        })
                        .catch(error => {
                            console.log('Update error: ',error);
                            response.send(fillHtml('Error updating: ' + error));
                        });
                    }
                });
            }
        });      
    })
    .catch(function(error) {
        console.error("Error saving day: ", error);
        response.send(error);
    });
});


exports.testEvent = functions.firestore.document('/test/{id}').onWrite(event => {
    const id = event.params.id;
    var info = event.data;
    
    var newVal = {};
    try {
        newVal = info.data();
        console.log('newVal: ', newVal);
    }
    catch (e) {
        console.log('reg delete: ', oldVal);
    }
    if (newVal) {
        var oldDoc = event.data.previous;
        try{
            var oldVal = oldDoc.data();
            if (oldVal) { // UPDATE
                console.log('updating old: ', oldVal);
            }
            else {  // INSERT  
                console.log('item add: ', newVal);
                var d = new Date(newVal.datetime);
                var yyyy = d.getFullYear();
                var mm = d.getMonth();
                var dd = d.getDay();
                var dstr = yyyy && mm && dd;
    
                var key = newVal.user + '_' + dstr;
                console.log('key: ', key);
            }            
        }
        catch(err){
            console.log('OLD VAL: ',err);
        }
    }
});

function updateClient(mov , dif){
    //const fs = admin.firestore();
    const cref = fs.collection('clients').doc(mov.idClient);
    return cref.get().then(docCli => {
        const cli = docCli.data();
        cli.sales += dif;
        if ((mov.cp == 'CC') || (mov.cp == 'PC'))
            cli.balance += dif;
        return cref.set(cli).then(c => console.log('update cli ok'));
    }).catch(reason => {
        console.log('update client error: ',reason);
    });
}
function addDays(d, days) {
  var x = new Date(d);
  x.setDate(x.getDate() + days);
  return x.getTime();
}
function fillHtml(str){
    var color = 'Gray';
    
    var html = 
        "<html style='background:"+color+";color:white;text-shadow:1px 1px 1px #555'>"+
        "  <head>"+
        "    <style>" +
        "      html, body, .container {"+
        "          height: 100%;"+
        "      }"+
        "      .container {"+
        "          font-family:'Comic Sans MS', cursive, sans-serif;"+
        "          font-weight:bold;"+
        "          font-size:48px;"+
        "          display: flex;"+
        "          align-items: center;"+
        "          justify-content: center;"+
        "      }"+
        "    </style>"+
        "  </head>"+
        "  <body>"+
        "    <div class='container'> "+
        "      <div>"+ str +"</div>"+
        "    </div>"+
        "  </body>"+
        "</html>";
    return html;
}

