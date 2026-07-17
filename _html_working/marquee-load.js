window.onload = function() {
    fetch('/rfwebsite/_html_working/test-alert-data.json', {
        method: 'GET',
        credentials: 'include',
        mode: 'no-cors',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
            document.getElementById('marquee').style.display = 'none';
            //document.querySelector('#marquee').style.visibility = 'hidden';
        }
        return response.json();
    })
    .then(data => {
        if (data) {
            if (data[0]) {
                document.querySelector('#marquee').style.visibility = 'visible';
                document.getElementById('marquee').style.display = 'block';
                document.getElementById('marquee-text-left').innerHTML = '<a href="' + data[0][0] + '">' + data[0][1] + '</a>';
                document.getElementById('marquee-text-center').innerHTML = '<a href="' + data[0][0] + '">' + data[0][1] + '</a>';
                document.getElementById('marquee-text-right').innerHTML = '<a href="' + data[0][0] + '">' + data[0][1] + '</a>';
            }
            if (data[1]) {
                document.getElementById('marquee-text-center').innerHTML = '<a href="' + data[1][0] + '">' + data[1][1] + '</a>';
            }
            if (data[2]) {
                document.getElementById('marquee-text-right').innerHTML = '<a href="' + data[2][0] + '">' + data[2][1] + '</a>';
            }
        } else {
            //document.querySelector('#marquee').style.visibility = 'hidden';
            document.getElementById('marquee').style.display = 'none';
        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        //document.querySelector('#marquee').style.visibility = 'hidden';
        document.getElementById('marquee').style.display = 'none';
    });
}