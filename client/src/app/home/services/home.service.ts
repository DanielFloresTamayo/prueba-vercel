import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { Tutor } from '../../models/tutor.model';
import { Resena } from '../../models/resena.model';
import { Cita } from '../../models/cita.model';
import { FeaturedTutor } from '../../models/featured-tutor.dto';

@Injectable({ providedIn: 'root' })
export class HomeService {

    private api = 'https://grateful-essence-production-2233.up.railway.app';

    constructor(private http: HttpClient) { }

    getFeaturedTutors(): Observable<FeaturedTutor[]> {
        return forkJoin({
            tutors: this.http.get<Tutor[]>(`${this.api}/tutors`),
            citas: this.http.get<Cita[]>(`${this.api}/citas`),
            resenas: this.http.get<Resena[]>(`${this.api}/resenas`)
        }).pipe(
            map(({ tutors, resenas, citas }) => {

                return tutors.map(tutor => {


                    const citasTutor = citas.filter(c => c.tutorId === tutor.id && c.estado === 'completada');
                    const resenasTutor = resenas.filter(r => r.tutorId === tutor.id && r.rating != null);

                    const totalResenas = resenasTutor.length;
                    const citasCompletadas = citasTutor.length;

                    const ratingPromedio =
                        totalResenas === 0
                            ? 0
                            : +(resenasTutor.reduce((a, b) => a + (b.rating || 0), 0) / totalResenas).toFixed(2);


                    const verificado =
                        citasCompletadas >= 1 &&
                        totalResenas >= 1 &&
                        ratingPromedio >= 1;
                    
                    return <FeaturedTutor>{
                        tutor,
                        ratingPromedio,
                        totalResenas,
                        citasCompletadas,
                        verificado
                    };
                })
                    .filter(t => t.totalResenas > 0)
                    .sort((a, b) => b.ratingPromedio - a.ratingPromedio)
                    .slice(0, 6);
            })
        );
    }
}
