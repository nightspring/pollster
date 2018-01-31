const form = document.getElementById('vote-form');

// Form submit event
form.addEventListener('submit', (e) => {
	const choice = document.querySelector('input[name=coin]:checked').value;
	const data = {coin: choice};

	fetch('http://localhost:3000/poll', {
		method: 'post',
		body: JSON.stringify(data),
		headers: new Headers({
			'Content-Type': 'application/json'
		})
	})
	.then(res => res.json())
	.then(data => console.log(data))
	.catch(err => console.log(err));

	e.preventDefault();
});

let dataPoints = [
	{ label: 'Bitcoin', y: 0 },
	{ label: 'Ethereum', y: 0 },
	{ label: 'Litecoin', y: 0 },
	{ label: 'Monero', y: 0 }
];

const chartContainer = document.querySelector('#chartContainer');

if(chartContainer) {
	const chart = new CanvasJS.Chart('chartContainer', {
		animationEnabled: true,
		theme: 'theme1',
		title: {
			text: 'Coin Results'
		},
		data: [
			{
				type: 'column',
				dataPoints: dataPoints
			}
		]
	});
	chart.render();

	// Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('bebe81c70727ec9b0795', {
      cluster: 'us2',
      encrypted: true
    });

    var channel = pusher.subscribe('coin-poll');
    channel.bind('coin-vote', function(data) {
      dataPoints = dataPoints.map(x => {
      	if(x.label == data.coin) {
      		x.y += data.points;
      		return x;
      	} else {
      		return x;
      	}
      });
      chart.render();
    });
}