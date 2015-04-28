#!/bin/bash

#restart service(s). Stop them in the given order, start in the reverse order

args=("$@")
ELEMENTS=${#args[@]}

for (( i=0;i<$ELEMENTS;i++)); do
    service ${args[${i}]} stop
done 

for (( i=$ELEMENTS-1;i>0;i--)); do
    service ${args[${i}]} start
done 
