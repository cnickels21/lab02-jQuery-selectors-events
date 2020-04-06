'use strict';

const filter = [];

function Image(image) {
    this.image_url = image.image_url;
    this.title = image.title;
    this.description = image.description;
    this.keyword = image.keyword;
    this.horns = image.horns;
    filter.push(this);

    // for (let key in image) {
    //     this[key] = image[key];
    // }

}


//Mustache render prototype

// let animalId = '#animal-template';

Image.prototype.render = function () {
    let animal = $('#animal-template').html();
    let html = Mustache.render(animal, this);
    $('main').append(html);
}

// jQuery render prototype

// Image.prototype.render = function (container) {
//     let $container = $(container);
//     let $template = $('#photo-template');
//     let $image = $template.clone();
//     $image.removeClass();
//     $image.removeAttr('id');
//     $image.find('h2.image-name').text(this.title);
//     $image.find('img.image-display').attr('src', this.image_url);
//     $image.find('p').text(this.description);
//     $container.append($image);
// }

const keywords = [];

function makeMyMenu(image) {
    let $menu = $('.dropdown');
    let $createOptions = $("<option>");
    $createOptions.text(image.keyword);
    $createOptions.val(image.keyword);
    if (!keywords.includes(image.keyword)) {
        keywords.push(image.keyword);
        $menu.append($createOptions);
    }
};

const ajaxSettings = {
    method: 'get',
    dataType: 'json'
};

let images = null;

$.ajax('./data/page-1.json', ajaxSettings).then(function (data) {
    images = data;
    renderImages('default');
    images.forEach(image => {
        makeMyMenu(image);
    });
});

$('.page1').on('click', function () {
    $.ajax('./data/page-1.json', ajaxSettings).then(function (data) {
        images = data;
        renderImages('default');
        images.forEach(image => {
            makeMyMenu(image);
        })
    });
})

$('.page2').on('click', function () {
    $.ajax('./data/page-2.json', ajaxSettings).then(function (data) {
        images = data;
        renderImages('default');
        images.forEach(image => {
            makeMyMenu(image);
        })
    });
})

function renderImages(filter) {
    $('main').empty();
    images.forEach((image) => {
        let displayImage = new Image(image);
        if (displayImage.keyword === filter) {
            displayImage.render();
        } else if (filter === 'default') {
            displayImage.render();
        }
    });
}


$('.dropdown').on('change', function () {
    let $value = $('.dropdown option:selected').text();
    if ($value === 'Filter by Keyword') {
        location.reload();
    }
    let $this = $(this),
        filterValue = $this.val();
    renderImages(filterValue);
})

function sortAlphabetical(a, b) {
    console.log(images);
    let imageTitleA = a.title;
    let imageTitleB = b.title;
    console.log('I am here');
    let comparison = 0;
    if (imageTitleA > imageTitleB) {
        comparison = 1;
    } else if (imageTitleA < imageTitleB) {
        comparison = -1;
    }
    return comparison;
}

function sortImages(arr) {
    console.log(arr);
    arr.sort((a, b) => {
        // console.log(images);
        let imageTitleA = a.title;
        let imageTitleB = b.title;
        // console.log('I am here');
        if (imageTitleA > imageTitleB) {
            return 1;
        } else if (imageTitleA < imageTitleB) {
            return -1;
        } else {
            return 0
        }
    });
    renderImages(arr);
}

$('.sort').on('click', () => sortImages(filter));