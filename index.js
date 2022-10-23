const INPUT_VALUE_PREFIX = 'inputValue:';
$(() => {
  $('input').val(0);
  $('.res-yes-no').hide();
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.includes(INPUT_VALUE_PREFIX))
      $('#' + key.split(INPUT_VALUE_PREFIX)[1]).val(localStorage.getItem(key));
  }
  $('input').on('input', (e) => {
    localStorage.setItem(INPUT_VALUE_PREFIX + e.target.id, e.target.value);
    checkResults();
  });

  checkResults();
});

const calc = (mode = 25) => {
  let haveT1 = $('#have-t1').val();
  let haveT2 = $('#have-t2').val();
  let haveT3 = $('#have-t3').val();

  let needT2 = $('#need-t2').val();
  let needT3 = $('#need-t3').val();

  while (haveT3 >= Number(needT3) + 3) {
    console.log();
    haveT2++;
    haveT3 -= 3;
    if (mode == 25 && Math.random() <= 0.25) haveT3++;
    if (mode == 10 && Math.random() <= 0.1) haveT2++;
  }
  while (haveT2 >= Number(needT2) + 3) {
    haveT1++;
    haveT2 -= 3;
    if (mode == 25 && Math.random() <= 0.25) haveT2++;
    if (mode == 10 && Math.random() <= 0.1) haveT1++;
  }

  $('#res-t1').val(haveT1);
  $('#res-t2').val(haveT2);
  $('#res-t3').val(haveT3);
  $('input').trigger('input');
  checkResults();
};

const reset = () => {
  localStorage.clear();
  $('input').val(0);
  $('.res-yes-no').hide();
};

const checkResults = () => {
  for (let i = 1; i <= 3; i++) {
    if ($(`#need-t${i}`).val()==0) continue;
    let yes = $(`#res-t${i}`).val() - $(`#need-t${i}`).val() >= 0;
    if (yes) {
      $(`#yes-t${i}`).show();
      $(`#no-t${i}`).hide();
    } else {
      $(`#no-t${i}`).show();
      $(`#yes-t${i}`).hide();
    }
  }
};
