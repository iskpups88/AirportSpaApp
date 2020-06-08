import format from 'date-fns/format';

export function isExists(value) {
    return value !== undefined && value !== null;
}

export function safeArrayCheck(supposedArray) {
    return isExists(supposedArray) && Array.isArray(supposedArray);
}

export function toSearchParams(params) {
    const formatArray = (key, array) => {
        return array.map(value => {
            return key + encodeURIComponent('[]') + '=' + encodeURIComponent(value);
        }).join('&');
    };

    const formatObject = (key, object) => {
        return Object.keys(object).map(innerKey => {
            const superInnerKey = `${key}${encodeURIComponent('[' + innerKey + ']')}`;

            if (Array.isArray(object[innerKey])) {
                return formatArray(superInnerKey, object[innerKey]);
            } else if (typeof object[innerKey] === 'object') {
                return formatObject(superInnerKey, object[innerKey]);
            } else {
                return formatString(superInnerKey, object[innerKey]);
            }
        }).join('&');
    }

    const formatString = (key, value) => {
        return key + '=' + encodeURIComponent(value);
    };

    return Object.keys(params).map((key) => {
        if (Array.isArray(params[key])) {
            return formatArray(encodeURIComponent(key), params[key]);
        } else if (typeof params[key] === 'object') {
            return formatObject(encodeURIComponent(key), params[key]);
        } else {
            return formatString(encodeURIComponent(key), params[key]);
        }
    }).join('&');
}

export function decodeSearchParams<T>(searchString): T {
    const searchParams = new URLSearchParams(searchString);
    const result = {};

    // @ts-ignore
    for (let [key, value] of searchParams.entries()) {
        result[key] = value;
    }

    return result as T;
}

export function cleanObject(obj: Object): Object {
    const cleanedObject = {};

    Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key]) && obj[key].length === 0) {
            return;
        }

        if (!isExists(obj[key])) {
            return;
        }

        cleanedObject[key] = obj[key];
    });

    return cleanedObject;
}


export function getFormattedDateRange(startDate: Date, endDate: Date) {
    const formattedStartDate = `${format(startDate, 'yyyy-MM-dd')}T00:00:00.000Z`;
    const formattedEndDate = `${format(endDate, 'yyyy-MM-dd')}T23:59:59.000Z`;

    return {
        formattedStartDate,
        formattedEndDate,
    };
}

