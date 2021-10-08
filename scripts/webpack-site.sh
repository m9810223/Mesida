for siteId in "${@}"; do
    webpack -c ./configs/webpack.config.js --env siteId=${siteId}
done
