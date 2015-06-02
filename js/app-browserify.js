"use strict";

var Promise = require('es6-promise').Promise
// just Node?
// var fetch = require('node-fetch')
// Browserify?
require('whatwg-fetch') //--> not a typo, don't store as a var

// es6 polyfills, powered by babel
require("babel/register")

var urls = [ 'https://api.github.com/users/hkhatri77','https://api.github.com/users/hkhatri77/repos' ]

var requests = urls.map((url) => fetch(url).then((r) => r.json()))

function qs(selector) {
    return document.querySelector(selector)
}

Promise.all(requests).then((data) => {
    var profile = data[0],
        repos = data[1]

    var profile_string = ['name', 'login', 'blog', 'location', 'email', 'html_url'].map((key) => `<li>${key}: ${profile[key]}</li>`).join('')
    var repo_string = repos.map((repo) => `<li><a href="${repo.html_url}">${repo.name}</a></li>`).join('')

    qs('.profile img').src = profile.avatar_url
    qs('.profile ul').innerHTML = profile_string
    qs('.repos ul').innerHTML = repo_string
})

function GithubClient(username) {
    this.username = username
    var urls = [
        `https://api.github.com/users/username`
        `https://api.github.com/users/username/repos`
    ]
    this.drawToScreen()

    GithubClient.prototype = {
        drawToScreen: function() {
            var urls = ['https://api.github.com/users/username', 'https://api.github.com/users/username/repos']

            var requests = urls.map((url) => fetch(url).then((r) => r.json()))

            Promise.all(requests).then((data) => {
                var profile = data[0],
                    repos = data[1]

                var profile_string = ['name', 'login', 'blog', 'location', 'email', 'html_url'].map((key) => `<li>${key}: ${profile[key]}</li>`).join('')
                var repo_string = repos.map((repo) => `<li><a href="${repo.html_url}">${repo.name}</a></li>`).join('')

                qs('.profile img').src = profile.avatar_url
                qs('.profile ul').innerHTML = profile_string
                qs('.repos ul').innerHTML = repo_string
            })

        }
    }
}

window.addEventListener('hashchange', () => {
    new GithubClient(location.hash.substr(1))
})

var Backbone = require("backbone")
var GithubRouter = Backbone.Router.extend({
    routes: {
        'profile/:username': 'drawProfile',
    },
    drawProfile: function(user){
        new GithubClient(user)
    },

    initialize: function(){
        Backbone.history.start()
    }
})
var router = new GithubRouter()


 // var promise_data = Promise.all(promises).then((data_array) => {
     //var profile_info = data_array[0]
     //var repo_info = data_array[1]
     // console.log(data_array)
 // })




// var sorted = promise_data.then((data_array) => {
//     var profile_info = data_array[0]
//     	repos = data_array[1]
//     	items = [name, login, blog, location, email, html_url]

//     	profile_html = items.map((v) => `<li>${v} : ${profile_info.[v]}</li>`)
//         repos_html = repos.map((v) => `<li>${v.name}</li>).join ('')
//     	var repoNames = repos.map((v) => v.name)

//     	return [profile_html, repoNames]

// })
// //object --> strings

// html.then((html_strings) => {
//     //find the image on the dom and set the source
//     var img_html = `<img src=${html_strings[0].avatar_url}
//     document.querySelector('.profile').innerHTML = img.html

//     document.querySelector('profile_list').innerHTML = html_strings[0]
// })