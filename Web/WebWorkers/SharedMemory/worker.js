let arr = null;
onmessage = e => {
  if (e.data.type === 'init') {
    arr = e.data.payload
  }

  if (e.data.type === 'increment') {
    arr[0] ++;
  }

  if (e.data.type === 'decrement') {
    arr[0] --;
  }
}