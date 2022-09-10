let src_dict = {
  image1: [
    "https://www.dictionary.com/e/wp-content/uploads/2021/09/20210922_atw_memeStonk_800x800.png",
    "https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg",
  ],

  image2: [
    "https://images.theconversation.com/files/38926/original/5cwx89t4-1389586191.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
    "https://i.ytimg.com/vi/sxrzdev5l3A/maxresdefault.jpg",
  ],

  image3: [
    "https://image.shutterstock.com/image-photo/example-word-written-on-wooden-260nw-1765482248.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Number_3_in_yellow_rounded_square.svg/1024px-Number_3_in_yellow_rounded_square.svg.png",
  ],
};

let image_button_table = {
  image1: "button1",
  image2: "button2",
  image3: "button3",
  button1: "image1",
  button2: "image2",
  button3: "image3",
};

let image_intervalId_table = {
  image1: "",
  image2: "",
  image3: "",
};

let image_state = {
  // states: running, frozen
  image1: "running",
  image2: "running",
  image3: "running",
};

let src_index_dict = {
  image1: 0,
  image2: 0,
  image3: 0,
};

function get_src(image_id) {
  src_index_dict[image_id] = src_index_dict[image_id] == 1 ? 0 : 1;
  return src_dict[image_id][src_index_dict[image_id]];
}

function button_handler(button_id) {
  target_image = image_button_table[button_id];
  state = image_state[target_image];
  if (state === "running") {
    // stopping mechanism
    stop_an_interval(target_image, image_intervalId_table[target_image]);
    change_button_label(button_id, "Start");
    image_state[target_image] = "frozen";
  } else if (state === "frozen") {
    // starting mechanism
    start_an_interval(target_image);
    change_button_label(button_id, "Stop");
    image_state[target_image] = "running";
  }
}

function all_intervals_start() {
  let image1 = document.getElementById("image1");
  let image2 = document.getElementById("image2");
  let image3 = document.getElementById("image3");
  start_an_interval(image1.id);
  start_an_interval(image2.id);
  start_an_interval(image3.id);
}

function start_an_interval(image_id) {
  // this "LET" below is the most important thing in this JS file. Without it, everything goes wrong.
  let image_obj = document.getElementById(image_id);
  let interval_id = window.setInterval(function () {
    image_obj.src = get_src(image_id);
  }, get_interval());

  image_intervalId_table[image_id] = interval_id;

  // development messages:
  console.log(`Started: interval_id = ${interval_id} (${image_id})`);
}

function stop_an_interval(image_id, interval) {
  // development messages:
  console.log("stopped: interval_id = " + interval + " (" + image_id + ")");
  clearInterval(interval);
}

function change_button_label(button_id, next_sign) {
  button = document.getElementById(button_id);
  button.innerText = next_sign;
}

function get_interval() {
  return 1000 * (1 + Math.floor(Math.random() * 5));
}
