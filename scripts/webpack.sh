siteIds=${@}
webpack -c ./configs/webpack.config.js --env siteIds="${siteIds}"
