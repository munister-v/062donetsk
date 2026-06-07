const HERITAGE_SECTION_NAMES = {
  overview: 'Огляд',
  panneau: 'Панно',
  heritage: 'Спадщина',
  campus: 'Кампус',
  building: 'Корпус',
  labs: 'Лабораторії',
  simulation: 'Симуляція',
  achievements: 'Досягнення',
  archive: 'Архів',
  certs: 'Сертифікати',
  cert: 'Сертифікат',
  future: 'Майбутнє',
  library: 'Бібліотека',
  applicant: 'Абітурієнту',
  studentlife: 'Студентське життя',
  map: 'Мапа',
  timecapsule: 'Часова капсула',
  eras: 'Порівняння епох',
  science: 'Наука',
  international: 'Міжнародне',
  departments: 'Кафедри',
  admin: 'Редактор',
};

const HERITAGE_SECTION_INDEX = {
  heritage: '03',
  campus: '04',
  building: '05',
  labs: '06',
  simulation: '07',
  achievements: '08',
  archive: '09',
  certs: '10',
  cert: '10',
  future: '11',
  library: '12',
  applicant: '13',
  studentlife: '14',
  map: '15',
  timecapsule: '16',
  eras: '17',
  science: '18',
  international: '19',
  departments: '20',
  admin: '21',
};

const ComingSoonPage = ({ requestedPage, onNavigate }) => {
  const title = HERITAGE_SECTION_NAMES[requestedPage] || 'Новий розділ';
  const sectionIndex = HERITAGE_SECTION_INDEX[requestedPage] || '03';

  return (
    <section className="heritage-soon page page-anim">
      <img
        className="heritage-soon-bg"
        src="assets/donetsk-library.jpg"
        alt="Науково-технічна бібліотека ДонНТУ у Донецьку"
      />
      <div className="heritage-soon-shade"></div>

      <div className="heritage-soon-content">
        <div className="heritage-soon-index">{sectionIndex}</div>
        <span className="heritage-soon-kicker">DONNTU · ЦИФРОВА СПАДЩИНА</span>
        <h1>{title}</h1>
        <p className="heritage-soon-lead">
          Розділ ще збирається. Ми приводимо до ладу джерела, дати,
          підписи до фото й структуру матеріалу, щоб відкрити його вже
          як повноцінний архів, а не чорнову збірку.
        </p>

        <div className="heritage-soon-status" aria-label="Статус розробки">
          <span>КУРАТОРСЬКА ПІДГОТОВКА</span>
          <span className="heritage-soon-line"><i></i></span>
          <strong>СКОРО ВІДКРИЄМО</strong>
        </div>

        <div className="heritage-soon-actions">
          <button type="button" onClick={() => onNavigate('overview')}>
            До огляду
          </button>
          <button type="button" className="is-primary" onClick={() => onNavigate('panneau')}>
            Дивитися панно
          </button>
        </div>
      </div>

      <div className="heritage-soon-available">
        <span>Вже відкрито</span>
        <button type="button" onClick={() => onNavigate('overview')}>01 · Огляд проєкту</button>
        <button type="button" onClick={() => onNavigate('panneau')}>02 · Інтерактивне панно</button>
      </div>
    </section>
  );
};

Object.assign(window, { ComingSoonPage, HERITAGE_SECTION_NAMES });
