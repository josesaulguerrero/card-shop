import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash-es';

@Pipe({
	name: 'isEmptyObj',
})
export class IsEmptyObjPipe implements PipeTransform {
	public transform(object: object): boolean {
		return _.isEmpty(object);
	}
}
