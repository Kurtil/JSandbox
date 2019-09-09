#!/usr/bin/env bash

var="const BIMData ="
sed -i "1s/.*/$var/" dist/bundle.js
echo "export default BIMData" >> dist/bundle.js
