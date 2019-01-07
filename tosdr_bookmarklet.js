(function(){
    var ratingWrapper = document.createElement('div'),
        closeButton = document.createElement('a'),
        tosdrLink = "<a href='http://tosdr.org/index.html' target='_blank'>ToS;DR</a>",
        endpoint = 'http://tosdr.org/services/',
        url = document.domain.split('.'),
        domain;

    // Quick and dirty way of removing WWWs and subdomains
    if ( url.length === 3 ) {
        domain = url[1];
    } else {
        domain = url[0];
    }

    ratingWrapper.setAttribute('id', 'tosdrWrapper');
    ratingWrapper.setAttribute('style', 'text-align: center; font-size: 25px; border: 1px solid rgba(0, 0, 0, 0.25); padding: 15px; font-family: Helvetica; font-weight: 200; background-color: rgba(255, 127, 0, 0.96); position: absolute; z-index: 9999; width: 97%; box-shadow: 3px 3px 5px 6px #CCCCCC');

    closeButton.setAttribute('href', '#');
    closeButton.setAttribute('id', "tosdrClose");
    closeButton.setAttribute('style', 'float: right');
    closeButton.innerHTML = 'X';

    var request = new XMLHttpRequest(),
        response = '';
    request.onreadystatechange = function() {
        if ( request.readyState == 4 && request.status == 200 ) {
            response = JSON.parse(request.responseText);
            ratingWrapper.innerHTML = tosdrLink + ' rating: <span style="color:red;font-size:32px">' + response.tosdr.rated + '</span>';
        }
        else if ( request.readyState == 4 && request.status == 404 ) {
            ratingWrapper.innerHTML = "Sorry, " + tosdrLink + " doesn't have a rating for " + domain;
        }
        else if ( request.readyState == 4 ){
            ratingWrapper.innerHTML = "Sorry, " + tosdrLink + " isn't available right now";
        }
        document.body.insertBefore(ratingWrapper, document.body.firstChild);
        ratingWrapper.appendChild(closeButton);
    };
    request.open('GET', endpoint + domain + '.json', true);
    request.send();
    
    var close = document.createElement('script');
    close.type = 'text/javascript';
    close.innerHTML = "var x = document.getElementById('tosdrClose'); x.onclick = function() { var elem = document.getElementById('tosdrWrapper'); elem.setAttribute('style', 'display: none'); return false; }";
    document.body.appendChild(close);

    window.scroll(0,0);
})();
