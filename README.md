# SIX Saron compound calculator

https://www.six-group.com/en/products-services/the-swiss-stock-exchange/market-data/indices/swiss-reference-rates/saron-calculator.html

# get saron rates for q4 2022
```
./saron-compound.sh 2022-10-01 92
find data -type f |sort| while read f; do 
	v="$(basename $f|sed -e "s/.*calcu.saron.//;s/.json//" |tr "\n_" "\t\t")$(jq -r .value $f)"
	echo $v
done >saron-20221001-20221231.tsv
```


# RFR calculators
- https://www.realisedrate.com/