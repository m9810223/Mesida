for i in ${@}; do
    yarn build "${i}"
done
